import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import MediaCard from '../components/MediaCard';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SearchPage = () => {
    const { query } = useParams()

    const [movies, setMovies] = useState<any[]>([]);
    const [people, setPeople] = useState<any[]>([]);
    const [ogMovies, setOgMovies] = useState<any[]>([]);

    const fetchMovies = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
        console.log(response.data)
        setMovies(response.data.results);
    };

    const fetchOriginalData = async () => {
        const response = await axios.post(`${SERVER_URL}/movies/get-movie`, {
            name: query,
        });
        console.log(response.data)
        setOgMovies(response.data.movies);
    };

    useEffect(() => {
        if (query) {
            fetchMovies();
            fetchOriginalData();
        }
    }, [query]);

    return (
        <div className="w-full min-h-screen bg-gray-950 pt-20 p-10 max-md:pt-20 max-md:p-1 mx-auto">
            <h1 className="text-2xl font-bold text-white p-2">Search Results for "{query}"</h1>
            <div className="flex gap-10 pt-5">
                <div className="w-full rounded-xl overflow-y-auto p-8">
                    <div className='space-y-2'>
                        <h2 className='text-2xl font-bold text-white'>
                            Movies
                        </h2>
                        <div className="flex overflow-x-auto gap-6 overflow-y-hidden w-full">
                            {movies.map((movie, index) => (
                                <div key={index} className="flex-shrink-0">
                                    <MediaCard {...movie} isMovie={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='space-y-2 pt-3'>
                        <h2 className='text-2xl font-bold text-white'>
                            Original Movies
                        </h2>
                        <div className="flex overflow-x-auto gap-6 overflow-y-hidden w-full">
                            {ogMovies.map((movie, index) => (
                                <div key={index} className="flex-shrink-0">
                                    <MediaCard {...movie} isMovie={true} isOgMovie={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
