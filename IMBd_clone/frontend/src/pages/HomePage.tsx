import { Film, Clapperboard, Tv, Users, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Slideshow from '../components/SlideShow';
import MediaCard from '../components/MediaCard';
import ActorCard from '../components/ActorCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { movieType } from './AddMoviePage';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY;

type moiveType = {
    id: string,
    title: string,
    vote_average: number,
    poster_path: string,
    backdrop_path: string,
    overview: string,
    first_air_date: string,
}
type showType = {
    id: string,
    name: string,
    vote_average: number,
    poster_path: string,
    backdrop_path: string,
    overview: string,
    release_date: string,
}
type peopleType = {
    id: string,
    gender: number,
    known_for_department: string,
    name: string,
    original_name: string,
    profile_path: string,
}
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
function HomePage() {
    const [topMovies, setTopMovies] = useState<moiveType[] | null>(null);
    const [topTVShows, setTopShows] = useState<showType[] | null>(null);
    const [topPeople, setTopPeople] = useState<peopleType[] | null>(null);
    const [OgMovies, setOgMovies] = useState<movieType[] | null>(null);

    const fetchMovies = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setTopMovies(data.data.results);
    }
    const fetchShows = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setTopShows(data.data.results)
    }
    const fetchPeople = async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`);
        setTopPeople(data.data.results);
    }

    const fetchOriginalData = async () => {
        const data = await axios.get(`${SERVER_URL}/movies/get-all-movies`);
        setOgMovies(data.data.movies);
    }
    useEffect(() => {
        fetchMovies();
        fetchShows();
        fetchPeople();
        fetchOriginalData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900">

            {/* Slideshow */}
            <Slideshow />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 w-full">
                {/* Top Movies Section */}
                <section className="mb-16">
                    <div className="flex items-center mb-8 justify-between">
                        <div className='flex gap-2 items-center'>
                            <Clapperboard className="text-yellow-400 mr-2" />
                            <h2 className="text-2xl font-bold text-white">Top Movies</h2>
                        </div>
                        <Link to={'/movies'} className='flex items-center space-x-2 hover hover:text-yellow-400'>
                            See Full List
                            <ChevronRight />
                        </Link>
                    </div>
                    <div className="flex overflow-x-auto gap-6 overflow-y-hidden w-full">
                        {topMovies && topMovies.map((movie, index) => (
                            <div key={index} className="flex-shrink-0">
                                <MediaCard {...movie} isMovie={true} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <div className="flex items-center mb-8 justify-between">
                        <div className='flex gap-2 items-center'>
                            <Clapperboard className="text-yellow-400 mr-2" />
                            <h2 className="text-2xl font-bold text-white">IMBd Originals</h2>
                        </div>
                        <Link to={'/og-movies'} className='flex items-center space-x-2 hover hover:text-yellow-400'>
                            See Full List
                            <ChevronRight />
                        </Link>
                    </div>
                    <div className="flex overflow-x-auto gap-6 overflow-y-hidden w-full">
                        {OgMovies && OgMovies.map((movie, index) => (
                            <div key={index} className="flex-shrink-0">
                                <MediaCard {...movie} isOgMovie={true} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Top TV Shows Section */}
                <section className="mb-16">
                    <div className="flex items-center mb-8 justify-between">
                        <div className='flex gap-2 items-center'>
                            <Tv className="text-yellow-400 mr-2" />
                            <h2 className="text-2xl font-bold text-white">Top TV Shows</h2>
                        </div>
                        <Link to={'/tv-shows'} className='flex items-center space-x-2 hover hover:text-yellow-400'>
                            See Full List
                            <ChevronRight />
                        </Link>
                    </div>
                    <div className="flex overflow-x-auto gap-6 overflow-y-hidden w-full">
                        {topTVShows && topTVShows.map((show, index) => (
                            <div key={index} className="flex-shrink-0">
                                <MediaCard {...show} isMovie={false} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Actors Section */}
                <section className="mb-16">
                    <div className="flex items-center mb-8 justify-between">
                        <div className='flex gap-2 items-center'>
                            <Users className="text-yellow-400 mr-2" />
                            <h2 className="text-2xl font-bold text-white">Popular Personalities</h2>
                        </div>
                        <Link to={'/people'} className='flex items-center space-x-2 hover hover:text-yellow-400'>
                            See Full List
                            <ChevronRight />
                        </Link>
                    </div>
                    <div className="flex overflow-x-auto gap-6 overflow-y-hidden w-full">
                        {topPeople && topPeople.map((actor, index) => (
                            <div key={index} className="flex-shrink-0">
                                <ActorCard key={index} {...actor} />
                            </div>
                        ))}
                    </div>
                </section>
            </main >

            {/* Footer */}
            <footer className="bg-black/50 backdrop-blur-sm py-8" >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <Film className="text-yellow-400 h-6 w-6" />
                            <span className="text-yellow-400 font-bold text-xl">MovieDB</span>
                        </div>
                        <div className='text-gray-400 font-thin text-md'>
                            © All rights reserved OM7 2025
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-yellow-400">About</a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400">API</a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400">Contact</a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400">Terms</a>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
}

export default HomePage;