import { FaSearch } from "react-icons/fa";

export function Search(){

    return(

        <div className="relative max-w-xl mx-auto" role="search">
            <div className="absolute -inset-1 bg-linear-to-r from-pink-400 via-pink-500 to-purple-500 blur-xl opacity-40" />
            <div className="relative flex items-center bg-neutral-900 rounded-xl border-black/40 overflow-hidden">
                <FaSearch  size={15} className="text-neutral-500 mx-3 shrink-0"/>
                <label htmlFor="search-input" className="sr-only">
                    Buscar artistas, músicas ou álbuns...
                </label>
                <input 
                    type="search" 
                    placeholder="Músicas, artistas e álbuns"
                    className="flex-1 py-3 min-w-0 focus:outline-none"
                />
                <button className="font-semibold text-sm mx-2 px-3 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition-all duration-300 shrink-0">
                    Buscar
                </button>
            </div>
        </div>

    )

}