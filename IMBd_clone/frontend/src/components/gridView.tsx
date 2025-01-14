import React, { useEffect, useState } from 'react'
import MediaCard from './MediaCard'
import axios from 'axios';
import ActorCard from './ActorCard';

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const GridView = ({ type }: any) => {
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMovies = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        console.log(data.data)
        setData(data.data.results);
    }
    const fetchShows = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setData(data.data.results)
    }
    const fetchPeople = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setData(data.data.results);
    }

    const fetchOriginalData = async () => {
        const data = await axios.get(`${SERVER_URL}/movies/get-all-movies`);
        console.log(data.data)
        setData(data.data.movies);
    }
    const fetchInitialData = async () => {
        setData(null)
        if (type === "movie") {
            fetchMovies();
        }
        else if (type === "ogMovie") {
            fetchOriginalData();
        }
        else if (type === "tv") {
            fetchShows();
        }
        else if (type === "people") {
            fetchPeople();
        }
    }
    useEffect(() => {
        const f = async () => {
            setLoading(true)
            await fetchInitialData();
            setLoading(false)
        }
        f()
    }, [type])
    return (
        <>
            {
                loading ?
                    <div className='w-full min-h-screen pt-20 p-10 mx-auto flex justify-center items-center'>
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray400 text-xl"></div>
                    </div>
                    :
                    <div className='w-full min-h-screen pt-20 p-10 mx-auto'>
                        <div className="flex flex-wrap gap-6 w-full">
                            {data && data.map((item, index) => (
                                <div key={index} className="">
                                    {
                                        type === "movie" && <MediaCard {...item} isMovie={true} />
                                    }
                                    {
                                        type === "ogMovie" && <MediaCard {...item} isMovie={false} isOgMovie={true} />
                                    }
                                    {
                                        type === "tv" && <MediaCard {...item} isMovie={false} />
                                    }
                                    {
                                        type === "people" && <ActorCard {...item} />
                                    }

                                </div>
                            ))}
                        </div>
                    </div>
            }
        </>
    )
}

export default GridView
