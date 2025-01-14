import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function MediaCard({ title, name, first_air_date, vote_average, poster_path, overview, release_date, isMovie = false, id, isOgMovie = false }: any) {
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    return (
        <Link to={`/${isOgMovie ? 'ogmovie' : `${isMovie ? 'movie' : 'tv'}`}/${id}`} className="relative group cursor-pointer w-full">
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:z-20 group-hover:shadow-2xl">
                <div className="relative">
                    {
                        isOgMovie ? <img
                            src={`${poster_path}`}
                            alt={name}
                            className="w-full h-[400px] object-cover"
                        />
                            :

                            <img
                                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                                alt={isMovie ? title : name}
                                className="w-full h-[400px] object-cover"
                            />
                    }
                    <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-40"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pb-4">
                    {
                        isOgMovie ? <h3 className="text-white font-semibold text-lg">{name}</h3>
                            :
                            <h3 className="text-white font-semibold text-lg">{isMovie ? title : name}</h3>
                    }
                    {overview && (
                        <p className="text-white text-sm opacity-0 hidden group-hover:opacity-100 group-hover:block transition-all duration-300 line-clamp-3 max-h-[5rem] overflow-hidden">
                            {overview}
                        </p>
                    )}
                    <div className="flex items-center text-yellow-400">
                        <Star size={16} className="fill-yellow-400" />
                        {!isOgMovie && <span className="ml-1 text-sm">{vote_average}</span>}
                        {
                            isMovie ? <span className="ml-5 text-sm text-white">{formatDate(release_date)}</span> :
                                <span className="ml-5 text-sm text-white">{isMovie ? release_date : formatDate(first_air_date)}</span>
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MediaCard;
