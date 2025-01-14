import axios from 'axios';
import { ChevronRight, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY

type slideType = {
    id: string,
    title?: string,
    name?: string,
    overview: string,
    vote_average: number,
    backdrop_path: string
}
function Slideshow() {
    const [slides, setSlides] = useState<slideType[] | null>(null);
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
            setSlides(prev => [...(prev || []), ...response.data.results.slice(0, 5)]);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchShows = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
            setSlides(prev => [...(prev || []), ...response.data.results.slice(0, 5)]);
        } catch (error) {
            console.error('Error fetching TV shows:', error);
        }
    };
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setSlides([]);
        setCurrentSlide(0);
        fetchMovies();
        fetchShows();
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 10);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[70vh] overflow-hidden">
            {slides && slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
                    <img
                        src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                        alt={slide.title || slide.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                        <div className="container mx-auto">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{slide.title || slide.name}</h2>
                            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl line-clamp-3 max-h-[5rem] overflow-hidden">{slide.overview}</p>
                            <div className="flex items-center space-x-4 max-md:justify-around max-md:mb-4">
                                <div className="flex items-center text-yellow-400">
                                    <Star className="fill-yellow-400" size={20} />
                                    <span className="ml-1 text-lg">{slide.vote_average}</span>
                                </div>
                                <Link to={`/${slides[currentSlide].title ? 'movie' : 'tv'}/${slides[currentSlide].id}`} className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors flex gap-2">
                                    Details <ChevronRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides && slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${currentSlide === index ? 'bg-yellow-400' : 'bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slideshow
