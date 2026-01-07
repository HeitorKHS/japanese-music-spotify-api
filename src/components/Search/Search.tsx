'use client'

import { Button } from "../Button/Button";
import { useState } from "react";
import { BiSearch, BiX  } from "react-icons/bi";
import { useRouter } from "next/navigation";

export function Search(){

    const [value, setValue] = useState<string>("");
    const router = useRouter();

    const handleClear = () => {
        setValue("");
    };

    const handleEnter = (e: React.KeyboardEvent) => {
        if(e.key === "Enter" && value.trim()){
            router.push(`/search/${encodeURIComponent(value.trim())}`);
        }
    }

    return(
// flex items-center h-full bg-neutral-900 rounded-xl border-black/40 overflow-hidden
      
        <div className="relative">
            <BiSearch size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"/>
            <label htmlFor="search-input" className="sr-only">
                Buscar artistas, músicas ou álbuns...
            </label>
            <input 
                type="search" 
                placeholder="Músicas, artistas e álbuns"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                onKeyDown={handleEnter}
                className="pl-10 px-8 py-1 rounded-xl bg-neutral-900 border border-neutral-700 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all duration-400"
            />
            {value && (
                <Button
                    variant="ghost"
                    aria-label="Limpar busca"
                    onClick={handleClear}
                    className="text-neutral-500 mx-2 cursor-pointer"
                >
                    <BiX size={30}  className="absolute right-2 top-1/2 -translate-y-1/2"/>
                </Button>
            )}
        </div>

    )

}