import axios from 'axios'
import { Search, UserCogIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { UserContext } from '../App'
import { AddMovieContext, movieType } from '../pages/AddMoviePage'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

interface actorType {
    id: number,
    name: string,
    dob: string,
    gender: string,
    bio: string
}

const AddActorModel2 = ({ setOpenModal }: any) => {

    const [searchActors, setSearchActors] = useState<actorType[] | null>(null)
    const [searchInput, setSearchInput] = useState<string>("")
    const [newActor, setNewActor] = useState<actorType | null>(null)
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState<boolean>(false)
    const { movieData, setMovieData } = useContext(AddMovieContext)

    const getProds = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (searchInput.trim().length === 0) {
                alert('Enter a Name');
                return;
            }
            const response = await axios.post(`${SERVER_URL}/movies/get-actors`, {
                name: searchInput
            }, {
                headers: {
                    Authorization: 'Bearer ' + user?.token
                }
            })
            setSearchActors(response.data.actors)
        }
        catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleNewProd = async (e: any) => {
        e.preventDefault()
        if (!newActor || !newActor.name || !newActor.dob || !newActor.gender || !newActor.bio) {
            alert('Please fill out all fields for the new actor.');
            return;
        }
        try {
            const response = await axios.post(`${SERVER_URL}/movies/add-actor`, newActor, {
                headers: {
                    Authorization: "Bearer " + user?.token
                }
            })
            setMovieData((prev: any) => {
                const updatedActors = prev?.actors ? [...prev.actors, response.data.actor.id] : [response.data.actor.id];
                const updatedActorsFull = prev?.actorsFull ? [...prev.actorsFull, response.data.actor] : [response.data.actor];
                return {
                    ...prev,
                    actors: updatedActors,
                    actorsFull: updatedActorsFull,
                    name: prev?.name || '', // Retain existing values or provide defaults
                    overview: prev?.overview || '',
                    release_date: prev?.release_date || '',
                    poster_path: prev?.poster_path || '',
                    backdrop_path: prev?.backdrop_path || '',
                    producer: prev?.producer || null,
                    producerId: prev?.producerId || 0
                };
            });
            setOpenModal(false)
        } catch (error) {
            console.error(error)
        }
    }

    const addExistingActor = (actor: actorType, actorId: number) => {
        setMovieData((prev: any) => {
            const updatedActors = prev?.actors ? [...prev.actors, actorId] : [actorId];
            const updatedActorsFull = prev?.actorsFull ? [...prev.actorsFull, actor] : [actor];
            return {
                ...prev,
                actors: updatedActors,
                actorsFull: updatedActorsFull,
                name: prev?.name || '', // Retain existing values or provide defaults
                overview: prev?.overview || '',
                release_date: prev?.release_date || '',
                poster_path: prev?.poster_path || '',
                backdrop_path: prev?.backdrop_path || '',
                producer: prev?.producer || null,
                producerId: prev?.producerId || 0
            };
        });
        setOpenModal(false)
    }

    return (
        <div>
            <div className='px-6 py-2'>
                <div className='flex gap-5 items-center'>
                    <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Search actors' className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none" />
                    <button onClick={getProds} className='w-16 justify-center flex p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none'>
                        <Search />
                    </button>
                </div>
                <div className='w-full my-2 gap-2'>
                    {
                        loading ? <div className='w-full min-h-screen pt-20 p-10 mx-auto flex justify-center items-center'>
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray400 text-xl"></div>
                        </div> :
                            searchActors && searchActors.map((item, index) => (
                                <div key={index} className='px-5 w-full justify-between gap-10 flex p-2 rounded-md bg-gray-800 border border-gray-700'>
                                    <div>{item.name}</div>
                                    <button onClick={() => addExistingActor(item, item.id)} className='bg-white text-black px-4 py-1.5 rounded-xl'>Add</button>
                                </div>
                            ))
                    }
                </div>
            </div>
            <div className="flex items-center justify-center my-5">
                <hr className='w-1/2' />
                <p className='mx-2'>OR</p>
                <hr className='w-1/2' />
            </div>
            <h1>Add New Actor</h1>
            <div className="w-full h-full overflow-y-auto p-6 text-white">
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newActor?.name || ''}
                            onChange={(e) => setNewActor({ ...newActor, name: e.target.value } as actorType)}
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                            placeholder="Enter name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={newActor?.gender === 'Male'}
                                    onChange={(e) => setNewActor({ ...newActor, gender: e.target.value } as actorType)}
                                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={newActor?.gender === 'Female'}
                                    onChange={(e) => setNewActor({ ...newActor, gender: e.target.value } as actorType)}
                                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                                />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Date of birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={newActor?.dob || ''}
                            onChange={(e) => setNewActor({ ...newActor, dob: e.target.value } as actorType)}
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea
                            name="bio"
                            value={newActor?.bio || ''}
                            onChange={(e) => setNewActor({ ...newActor, bio: e.target.value } as actorType)}
                            rows={4}
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                            placeholder="Enter Bio"
                        />
                    </div>
                    <button onClick={handleNewProd} className='bg-white text-black rounded-xl px-5 py-1.5'>Add New</button>
                </div>
            </div>
        </div>
    )
}

export default AddActorModel2
