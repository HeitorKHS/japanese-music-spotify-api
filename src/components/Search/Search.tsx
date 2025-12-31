import { FaSearch } from "react-icons/fa";
import { Button } from "../Button/Button";

export function Search(){

    return(

        <div className="relative max-w-xl mx-auto group" role="search">
            <div className="absolute -inset-1 bg-linear-to-r from-pink-400 via-pink-500 to-purple-500 blur-xl opacity-40
                group-hover:from-pink-600 group-hover:via-pink-700 group-hover:to-purple-800 transition duration-500
            "/>
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
                <Button
                    variant="primary"
                    size="sm"
                    className="mx-2"
                >
                    Buscar
                </Button>
            </div>
        </div>

    )

}