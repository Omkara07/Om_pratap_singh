import React, { useContext } from 'react';
import { Camera, Calendar, User, Users } from 'lucide-react';
import { AddMovieContext } from '../pages/AddMoviePage';

const AddMoviePreview = () => {
    const { movieData } = useContext(AddMovieContext);

    return (
        <div className="w-full h-full flex flex-col text-white p-6">
            {movieData ? (
                <>
                    <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
                        {movieData.backdrop_path ? (
                            <img
                                src={movieData.backdrop_path}
                                alt="Movie backdrop"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Camera className="w-12 h-12 text-gray-500" />
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex gap-4">
                        <div className="w-32 h-48 bg-gray-800 rounded-lg overflow-hidden">
                            {movieData.poster_path ? (
                                <img
                                    src={movieData.poster_path}
                                    alt="Movie poster"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-gray-500" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h2 className="text-2xl font-bold">{movieData.name || 'Movie Title'}</h2>
                            <div className="mt-2 flex items-center text-gray-400">
                                <Calendar className="w-4 h-4 mr-2" />
                                {movieData.release_date || 'Release Date'}
                            </div>
                            <p className="mt-4 text-gray-300">{movieData.overview || 'Movie overview and description will appear here...'}</p>

                            <div className="mt-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <User className="w-4 h-4" />
                                    <span>Producer: {movieData.producer?.name || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-gray-400">
                                    <Users className="w-4 h-4" />
                                    <span>Actors: {movieData.actorsFull?.map(a => a.name).join(', ') || 'Not specified'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                        <Camera className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-xl">Enter movie details to see preview</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddMoviePreview
