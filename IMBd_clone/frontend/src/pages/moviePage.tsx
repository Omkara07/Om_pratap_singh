import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Star, DollarSign, Link } from 'lucide-react';
import ActorCard from '../components/ActorCard';
import { UserContext } from '../App';

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER_URL = import.meta.env.VITE_SERVER_URL

const MoviePage = ({ isMovie, isOgMovie = false }: { isMovie: boolean, isOgMovie?: boolean }) => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    // const [videos, setVideos] = useState<any>([]); // Video state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const { user } = useContext(UserContext)
    const [Img, setImg] = useState<string | null>(null)
    const [backImg, setBackImg] = useState<string | null>(null)

    const getData = async () => {
        if (isOgMovie) {
            try {
                const res = await axios.post(`${SERVER_URL}/movies/get-movie`, {
                    movieId: parseInt(id as string)
                }, {
                    headers: {
                        authorization: `Bearer ${user?.token}`
                    }
                });
                setData(res?.data.movie);
            } catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false);
            }
        }
        else {

            try {
                const res = await axios.get(`https://api.themoviedb.org/3/${isMovie ? 'movie' : 'tv'}/${id}?api_key=${API_KEY}&language=en-US`);
                setData(res?.data);
            } catch (err) {
                setError('Failed to fetch movie data.');
            } finally {
                setLoading(false);
            }
        }

        // Fetch videos (if needed)
        // try {
        //     const videoRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        //     setVideos(videoRes?.data?.results || []);
        // } catch (err) {
        //     console.error('Failed to fetch videos:', err);
        // }
    };

    useEffect(() => {
        const f = async () => {
            await getData();
        }
        f()
    }, []);

    const formatCurrency = (number: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(number);
    };

    // If data is still loading, display loading state
    if (loading) {
        return <div className='w-full min-h-screen pt-20 p-10 mx-auto flex justify-center items-center'>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray400 text-xl"></div>
        </div>;
    }

    // If there's an error, display error message
    if (error) {
        return <div className="min-h-screen bg-gray-900 text-white">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section with Backdrop */}
            {data && (
                <div
                    className="relative md:h-96 h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(17,24,39,1)), url(${isOgMovie ? data.backdrop_path : `https://image.tmdb.org/t/p/original${data.backdrop_path}`})`
                    }}
                >
                    <div className="md:absolute bottom-0 left-0 right-0 p-8 max-md:top-0">
                        <div className="container mx-auto flex max-md:flex-col max-md:items-center gap-8 md:items-end">
                            <img
                                src={`${isOgMovie ? data.poster_path : `https://image.tmdb.org/t/p/w500${data.poster_path}`}`}
                                alt={isMovie ? data.title : data.name}
                                className="w-48 rounded-lg shadow-2xl max-md:p-4 block"
                            />
                            <div className="flex-1">
                                {
                                    isOgMovie ?
                                        <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
                                        :
                                        <h1 className="text-4xl font-bold mb-2">{isMovie ? data.title : data.name}</h1>
                                }
                                {!isOgMovie &&
                                    <>
                                        <p className="text-gray-300 text-xl italic mb-4">{data.tagline}</p>
                                        <div className="flex flex-wrap gap-4 mb-4">
                                            {data.genres.map((genre: any) => (
                                                <span
                                                    key={genre.id}
                                                    className="px-3 py-1 bg-orange-400 rounded-full text-sm"
                                                >
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                }
                                <div className="flex gap-6 text-sm text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {
                                            isOgMovie ?
                                                <div>{new Date(data.release_date).getFullYear()}</div>
                                                :
                                                <>
                                                    {
                                                        isMovie ?
                                                            <div>{new Date(data.release_date).getFullYear()}</div>
                                                            :
                                                            <div>{new Date(data.first_air_date).getFullYear()}</div>
                                                    }
                                                </>
                                        }
                                    </div>
                                    {
                                        !isOgMovie &&
                                        <>
                                            {
                                                isMovie ?
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                                                    </div>
                                                    :
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        <p>Seasons: {data.number_of_seasons}</p>
                                                        <p>Episodes: {data.number_of_episodes}</p>
                                                    </div>
                                            }
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-yellow-400" />
                                                {data.vote_average.toFixed(1)}
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Main Content */}
            <div className="container max-md:relative mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">{data.overview}</p>
                        </section>

                        {!isOgMovie && <section>
                            <h2 className="text-2xl font-bold mb-4">Production Companies</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {data.production_companies.map((company: any) => (
                                    <div key={company.id} className="bg-gray-800 p-4 rounded-lg text-center">
                                        {company.logo_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                alt={company.name}
                                                className="h-12 object-contain mx-auto mb-2"
                                            />
                                        )}
                                        <p className="text-sm text-gray-300">{company.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                        }

                        {isOgMovie ?
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Producer</h2>
                                    <div className='md:w-1/4 w-full'>
                                        <ActorCard {...data.producer} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Acting Cast</h2>
                                    <div className='flex flex-wrap gap-4'>
                                        {
                                            data.actors.map((actor: any, index: number) => (
                                                <div key={index} className='md:w-1/4 w-full'>
                                                    <ActorCard {...actor.actor} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                            : <>
                                {
                                    !isMovie &&
                                    <div className='md:w-1/4 w-full'>
                                        <ActorCard {...data.created_by[0]} />
                                    </div>
                                }
                            </>}
                    </div>

                    {/* Right Column */}
                    {
                        !isOgMovie &&
                        <div className="space-y-6">
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-4">{isMovie ? "Movie" : "Show"} Info</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-400 text-sm">Status</p>
                                        <p>{data.status}</p>
                                    </div>
                                    {
                                        isMovie &&
                                        <div>
                                            <p className="text-gray-400 text-sm">Budget</p>
                                            <p className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4" />
                                                {formatCurrency(data.budget)}
                                            </p>
                                        </div>
                                    }
                                    <div>
                                        <p className="text-gray-400 text-sm">Hompage</p>
                                        <p className="flex items-center gap-2 pt-1">
                                            <Link className="w-4 h-4" />
                                            <a href={`${data.homepage}`} target="_blank" className='font-mono text-orange-400'>Visit the Homepage</a>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Original Language</p>
                                        <p>{data.original_language}</p>
                                    </div>
                                </div>
                            </div>

                            {data.belongs_to_collection && (
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-xl font-bold mb-4">Collection</h3>
                                    <div
                                        className="relative h-40 rounded-lg bg-cover bg-center"
                                        style={{
                                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/w500${data.belongs_to_collection.backdrop_path})`
                                        }}
                                    >
                                        <div className="absolute bottom-0 p-4">
                                            <p className="font-bold">{data.belongs_to_collection.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    }

                </div>
            </div>
        </div >
    );
};

export default MoviePage;
