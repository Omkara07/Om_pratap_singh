import React, { useContext, useEffect, useState } from 'react';
import { AddMovieContext, movieType } from '../pages/AddMoviePage';
import Modal from './Modal';
import AddActorModel2 from './AddActorModel2';
import AddProducerModel2 from './AddProducerModel2';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';


export interface producerType {
    id: number,
    name: string,
    gender: string,
    dob: string,
    bio: string
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const AddMovieForm = () => {
    const { movieData, setMovieData } = useContext(AddMovieContext);
    const [openProdModal, setOpenProdModal] = useState(false);
    const [openActorModal, setOpenActorModal] = useState(false);
    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMovieData(prev => ({
            ...prev,
            [name]: value
        }) as movieType);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (movieData?.name.length === 0) {
            alert('Enter a Name')
            return;
        }
        if (movieData?.overview.length === 0) {
            alert('Enter a Overview')
            return;
        }
        if (movieData?.release_date.length === 0) {
            alert('Enter a Release Date')
            return;
        }
        if (movieData?.actors.length === 0) {
            alert('Enter atleast one Actor')
            return;
        }
        if (!movieData?.producerId) {
            alert('Enter a Producer')
            return;
        }
        if (!movieData?.producerId) {
            alert('Enter a Producer')
            return;
        }
        try {
            const mov = await axios.post(`${SERVER_URL}/movies/add-movie`, movieData, {
                headers: {
                    Authorization: "Bearer " + user?.token
                }
            })
            navigate('/')
        }
        catch (e: any) {
            console.log(e)
        }

    };
    console.log(movieData)

    return (
        <form className="w-full h-full overflow-y-auto p-6 text-white">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Movie Title</label>
                    <input
                        type="text"
                        name="name"
                        value={movieData?.name || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Enter movie title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Overview</label>
                    <textarea
                        name="overview"
                        value={movieData?.overview || ''}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Enter movie overview"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Release Date</label>
                    <input
                        type="date"
                        name="release_date"
                        value={movieData?.release_date || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Poster URL</label>
                    <input
                        type="text"
                        name="poster_path"
                        value={movieData?.poster_path || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Enter poster image URL"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Backdrop URL</label>
                    <input
                        type="text"
                        name="backdrop_path"
                        value={movieData?.backdrop_path || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                        placeholder="Enter backdrop image URL"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Producer</label>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setOpenProdModal(true)
                    }} className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none">{movieData?.producer ? "Change Producer" : "Enter Producer"}</button>
                    <Modal isOpen={openProdModal} onClose={() => { setOpenProdModal(false) }}>
                        <AddProducerModel2 setOpenModal={setOpenProdModal} />
                    </Modal>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Actors</label>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setOpenActorModal(true)
                    }} className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none">Enter Actors</button>
                    <Modal isOpen={openActorModal} onClose={() => { setOpenActorModal(false) }}>
                        <AddActorModel2 setOpenModal={setOpenActorModal} />
                    </Modal>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full py-2 px-4 bg-orange-400 hover:bg-orange-500 rounded-md font-medium transition-colors"
                >
                    Add Movie
                </button>
            </div>
        </form>
    );
};

export default AddMovieForm
