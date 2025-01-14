import { Link } from "react-router-dom";

function ActorCard({ name, known_for_department, profile_path, gender, id }: any) {
    return (
        <Link to={`/actor/${id}`} className="relative group cursor-pointer">
            <div className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                <img
                    src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                    alt={name}
                    className="w-full h-[300px] object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{name} <span className="text-gray-200 font-thin text-[10px]">{gender == 1 ? "F" : "M"}</span></h3>
                    <p className="text-gray-300 text-sm">{known_for_department}</p>
                </div>
            </div>
        </Link>
    );
}

export default ActorCard