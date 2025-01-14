import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setError('');
        setSuccess(true);
        const user = await axios.post('http://localhost:5000/api/v1/user/signin', formData);
        localStorage.setItem('user', JSON.stringify(user.data));
        navigate('/')
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-6 shadow-2xl rounded-xl sm:px-10 border border-gray-700">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-gray-400">to IMBd</p>
                    </div>

                    {success ? (
                        <div className="mb-6 p-4 rounded-lg bg-green-900/50 border border-green-500/20">
                            <p className="text-green-400">
                                Logged in successfully!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="mb-4 p-4 rounded-lg bg-red-900/50 border border-red-500/20">
                                    <p className="text-red-400">{error}</p>
                                </div>
                            )}

                            <div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200"
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-orange-400 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-700 rounded-lg bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-200"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-400"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 transition-colors" />
                                        ) : (
                                            <Eye className="h-5 w-5 transition-colors" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 transition-all duration-200 shadow-lg shadow-orange-500/20"
                                >
                                    Sign up
                                </button>
                            </div>
                            <div className='flex justify-center w-full mx-auto'>
                                <p className='mx-auto w-full'>Don't have an account? <Link to={'/signup'} className='text-orange-400 hover:underline'>Create One</Link></p>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signin;