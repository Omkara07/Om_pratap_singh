import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Trophy, Users, Film } from 'lucide-react';
import { CgGenderFemale, CgGenderMale } from "react-icons/cg";


const API_KEY = import.meta.env.VITE_API_KEY;

const ActorPage = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const getData = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`);
            setData(res?.data);
        } catch (err) {
            setError('Failed to fetch movie data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    function formatDate(dateString: string) {
        if (!dateString) return "Not Available";
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Intl.DateTimeFormat('en-US').format(date);
    }

    if (loading) {
        return (
            <div className='w-full min-h-screen pt-20 p-10 mx-auto flex justify-center items-center'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray400 text-xl"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex justify-center items-center">
                <div className="text-red-400 text-2xl">{error}</div>
            </div>
        );
    }

    return data && (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Hero Section */}
            <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="relative group">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                            alt={data.name}
                            className="w-72 rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {data.name}
                        </h1>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Film className="w-5 h-5" />
                            <span>{data.known_for_department}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Quick Stats */}
                    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-6">Quick Information</h2>
                        <div className="grid gap-6">
                            <div className="flex items-center gap-4">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <div>
                                    <div className="text-gray-400 text-sm">Birthday</div>
                                    <div>{formatDate(data.birthday)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-red-400" />
                                <div>
                                    <div className="text-gray-400 text-sm">Place of Birth</div>
                                    <div>{data.place_of_birth || "Not Available"}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {
                                    data.gender === 1 ?
                                        <CgGenderFemale className='text-[30px] items-center -mx-1  text-pink-400' />
                                        : <CgGenderMale className='text-[30px] items-center -mx-1 text-blue-400' />
                                }
                                <div>
                                    <div className="text-gray-400 text-sm">Gender</div>
                                    <div>{data.gender === 1 ? 'Female' : 'Male'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Trophy className="w-5 h-5 text-yellow-400" />
                                <div>
                                    <div className="text-gray-400 text-sm">Popularity</div>
                                    <div>{data.popularity.toFixed(1)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Users className="w-5 h-5 text-green-400" />
                                <div>
                                    <div className="text-gray-400 text-sm">Also Known As</div>
                                    <div className="line-clamp-2">{data.also_known_as.join(", ") || "No other names"}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Biography */}
                    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-6">Biography</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300 leading-relaxed">
                                {data.biography || "No biography available."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorPage;