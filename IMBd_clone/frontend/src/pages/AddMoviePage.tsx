import React, { createContext, useState } from 'react'
import AddMoviePreview from '../components/AddMoviePreview';
import AddMovieForm from '../components/AddMovieForm';

export interface movieType {
    name: string,
    overview: string,
    release_date: string,
    poster_path: string,
    backdrop_path: string,
    actors: any[],
    producer: any,
    producerId: number,
    actorsFull: any[]
}
interface AddMovieContextType {
    movieData: movieType | null;
    setMovieData: React.Dispatch<React.SetStateAction<movieType | null>>;
}

export const AddMovieContext = createContext<AddMovieContextType>({} as AddMovieContextType)
const AddMoviePage = () => {
    const [movieData, setMovieData] = useState<movieType | null>(null)
    return (
        <AddMovieContext.Provider value={{ movieData, setMovieData }}>
            <div className='flex justify-around items-center bg-gray-900 min-h-screen pt-20 gap-10 md:p-10 max-md:p-4 max-md:flex-col '>
                <div className='flex md:w-1/2 w-full md:h-[80vh] shadow-xl shadow-gray-950 bg-gray-950 rounded-xl'>
                    <AddMoviePreview />
                </div>
                <div className=' flex md:w-1/2 w-full md:h-[80vh] shadow-xl shadow-gray-950 bg-gray-950 rounded-xl'>
                    <AddMovieForm />
                </div>
            </div>
        </AddMovieContext.Provider>
    )
}

export default AddMoviePage
