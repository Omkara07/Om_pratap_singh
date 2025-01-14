import express, { Request, Response } from "express";
import { prisma } from "../db";
import { z } from 'zod'
import { GetUserMiddleware } from "../middleware/GetUser";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello from movies");
})

const MovieSchema = z.object({
    name: z.string().min(1, "Movie name is required"),
    overview: z.string().min(1, "Overview is required"),
    backdrop_path: z.string().optional(),
    poster_path: z.string().min(1, "Poster path is required"),
    release_date: z.string().min(1, "Release date is required"),
    producerId: z.number().int().positive("Producer ID is required"),
    actors: z.array(z.number().int().positive()).min(1, "At least one actor is required")
});

router.post("/add-movie", GetUserMiddleware, async (req: Request, res: Response) => {
    try {
        // Validate input
        const validatedData = MovieSchema.parse(req.body);

        // Create movie with proper actor relationships
        const movie = await prisma.movies.create({
            data: {
                name: validatedData.name.toLowerCase(),
                overview: validatedData.overview,
                poster_path: validatedData.poster_path,
                backdrop_path: validatedData.backdrop_path ?? "",
                release_date: new Date(validatedData.release_date),
                producerId: validatedData.producerId,
                actors: {
                    create: validatedData.actors.map(actorId => ({
                        actor: {
                            connect: { id: actorId }
                        }
                    }))
                }
            },
            // Include related data in response
            include: {
                actors: {
                    include: {
                        actor: true
                    }
                },
                producer: true
            }
        });

        res.status(201).json({
            success: true,
            message: "Movie added successfully",
            data: movie
        });
    } catch (error: any) {
        // Handle different input type errors
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                message: "Invalid input data",
                errors: error.errors
            });
            return
        }

        // Handle Prisma errors
        if (error.code === 'P2002') {
            res.status(409).json({
                success: false,
                message: "Movie already exists"
            });
            return
        }

        if (error.code === 'P2025') {
            res.status(404).json({
                success: false,
                message: "Referenced producer or actor not found"
            });
            return
        }

        // Log unexpected errors
        console.error('Error adding movie:', error);

        res.status(500).json({
            success: false,
            message: "Internal server error while adding movie"
        });
    }
});

router.post('/add-actor', GetUserMiddleware, async (req: Request, res: Response) => {
    const { name, gender, dob, bio } = req.body;
    try {
        const actor = await prisma.actor.create({
            data: {
                name: name.toLowerCase(),
                gender,
                dob: new Date(dob),
                bio
            }
        })
        res.status(200).json({ message: "Actor added", actor })
    }
    catch (e) {
        res.status(404).json({ message: "Actor already exists", error: e })
    }
})

router.post('/add-producer', GetUserMiddleware, async (req: Request, res: Response) => {
    const { name, gender, dob, bio } = req.body;
    const producer = await prisma.producer.create({
        data: {
            name: name.toLowerCase(),
            gender,
            dob: new Date(dob),
            bio
        }
    })
    res.status(200).json({ message: "Producer added", producer })
})

router.post('/get-movie', async (req: Request, res: Response) => {
    const { name, movieId } = req.body;
    try {

        if (movieId) {
            const movie = await prisma.movies.findUnique({
                where: {
                    id: movieId,
                },
                include: {
                    actors: {
                        include: {
                            actor: true
                        }
                    },
                    producer: true
                }
            })
            const formattedMovie = {
                ...movie,
                release_date: movie?.release_date.toISOString()
            };
            res.status(200).json({ movie: formattedMovie });
        }
        else {
            const movies = await prisma.movies.findMany({
                where: {
                    name,
                },
                include: {
                    actors: {
                        include: {
                            actor: true
                        }
                    },
                    producer: true
                }
            })
            const formattedMovies = movies.map((movie) => ({
                ...movie,
                release_date: movie?.release_date.toISOString()
            }))
            res.status(200).json({ movies: formattedMovies });
        }
    }
    catch (e) {
        res.status(404).json({ message: "Movie not found", error: e });
    }
})

router.post("/get-producers", async (req: Request, res: Response) => {
    const { name } = req.body;
    try {

        const producers = await prisma.producer.findMany({
            where: {
                name: name
            }
        });
        const formattedProducers = producers.map((item) => ({
            ...item,
            dob: item?.dob.toISOString()
        }))
        res.status(200).json({ producers: formattedProducers });
    }
    catch (e) {
        res.status(401).json({ message: "Error while finding producers", error: e })
    }
})
router.post("/get-actors", async (req: Request, res: Response) => {
    const { name } = req.body;
    try {

        const actors = await prisma.actor.findMany({
            where: {
                name: name
            }
        });
        const formattedResults = actors.map((item) => ({
            ...item,
            dob: item?.dob.toISOString()
        }))
        res.status(200).json({ actors: formattedResults });
    }
    catch (e) {
        res.status(401).json({ message: "Error while finding producers", error: e })
    }
})

router.get("/get-all-movies", async (req: Request, res: Response) => {
    try {
        const movies = await prisma.movies.findMany({});
        const formattedMovies = movies.map((movie) => ({
            ...movie,
            release_date: movie?.release_date.toISOString()
        }))
        res.status(200).json({ movies: formattedMovies });
    }
    catch (e) {
        res.status(401).json({ message: "Error while finding producers", error: e })
    }
})

export default router