import axios from 'axios'
import { Search, UserCogIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { UserContext } from '../App'
import { producerType } from './AddMovieForm'
import { AddMovieContext, movieType } from '../pages/AddMoviePage'

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const AddProducerModel2 = ({ setOpenModal }: any) => {

    const [searchProds, setSearchProds] = useState<producerType[] | null>(null)
    const [searchInput, setSearchInput] = useState<string>("")
    const [producer, setProducer] = useState<producerType | null>(null)
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState<boolean>(false)
    const { movieData, setMovieData } = useContext(AddMovieContext)

    const getProds = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (searchInput.length === 0) {
                alert('Enter a Name');
                return;
            }
            const prods = await axios.post(`${SERVER_URL}/movies/get-producers`, {
                name: searchInput
            }, {
                headers: {
                    Authorization: 'Bearer ' + user?.token
                }
            })
            console.log(prods.data)
            setSearchProds(prods.data.producers)
            setLoading(false)
        }
        catch (e) {
            console.log(e)
            setLoading(false);
        }
    }

    const handleNewProd = async (e: any) => {
        e.preventDefault();
        try {

            const prod = await axios.post(`${SERVER_URL}/movies/add-producer`, producer, {
                headers: {
                    Authorization: "Bearer " + user?.token
                }
            })
            setMovieData(prev => ({
                ...prev, producer: producer, producerId: prod.data.producer?.id
            }) as movieType)
            setOpenModal(false);
        }
        catch (e: any) {
            console.log(e)
        }
    }
    return (
        <div>
            <div className='px-6 py-2'>
                <div className='flex gap-5 items-center'>
                    <input type="text" value={searchInput} onChange={(e) => {
                        e.preventDefault();
                        setSearchInput(e.target.value)
                    }} placeholder='Search Producer' className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none" />
                    <button onClick={(e) => getProds(e)} className='w-16 justify-center flex p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none'>
                        <Search />
                    </button>
                </div>
                <div className='w-full my-2 gap-2'>
                    {
                        loading ? <div className='w-full min-h-screen pt-20 p-10 mx-auto flex justify-center items-center'>
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray400 text-xl"></div>
                        </div> :
                            <div>

                                {
                                    searchProds && searchProds?.map((item: producerType, index: number) => {
                                        return (
                                            <div key={index} className='px-5 w-full justify-between gap-10 flex p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none'>
                                                <div>{item.name}</div>
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    setMovieData(prev => ({
                                                        ...prev, producer: item, producerId: item.id
                                                    }) as movieType)
                                                    setOpenModal(false);
                                                }} className='bg-white text-black px-4 py-1.5 rounded-xl'>Add</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
            <div className="flex items-center justify-center my-5">
                <hr className='w-1/2' />
                <p className='mx-2'>OR</p>
                <hr className='w-1/2' />
            </div>
            <h1>Add New Producer</h1>
            <div className="w-full h-full overflow-y-auto p-6 text-white">
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={producer?.name || ''}
                            onChange={(e) => setProducer((prev) => ({ ...prev, name: e.target.value } as producerType))}
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
                                    checked={producer?.gender === 'Male'}
                                    onChange={(e) => setProducer((prev) => ({ ...prev, gender: e.target.value } as producerType))}
                                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={producer?.gender === 'Female'}
                                    onChange={(e) => setProducer((prev) => ({ ...prev, gender: e.target.value } as producerType))}
                                    className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                                />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Date of birth</label>
                        <input
                            type="Date"
                            name="DOB"
                            value={producer?.dob || ''}
                            onChange={(e) => setProducer((prev) => ({ ...prev, dob: e.target.value } as producerType))}
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea
                            name="Bio"
                            value={producer?.bio || ''}
                            onChange={(e) => setProducer((prev) => ({ ...prev, bio: e.target.value } as producerType))}
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

export default AddProducerModel2
