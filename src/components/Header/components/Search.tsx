'use client'

import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";
import { FaSearch, FaTimes } from "react-icons/fa";

export function Search(){

    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleClear = (): void => {
        setValue("");
        inputRef.current?.focus();
    }

    const handleClick = (): void => {
        if(value.trim()){
            router.push(`/search/${encodeURIComponent(value.trim())}`);
        }
    }

    const handleEnter = (e: React.KeyboardEvent): void => {
        if(e.key === 'Enter' && value.trim()){
            router.push(`/search/${encodeURIComponent(value.trim())}`); 
        }
    }

    return(
        <div className="relative flex items-center w-full" role="search">
                 
            <label htmlFor="search-input" className="sr-only">
                Buscar músicas, artistas e álbuns
            </label>
            <input 
                ref={inputRef}
                id="search-input"
                type="search"
                autoComplete="off"
                value={value}
                onChange={(e) => setValue(e.target.value)} 
                onKeyDown={handleEnter}
                placeholder="Músicas, artistas e álbuns"
                className="w-full md:pl-9 pr-20 md:pr-10 py-2 md:py-1 border-b md:border md:bg-[#1f1f1f] border-[#1f1f1f] md:rounded-2xl focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />           

            <Button
                type="button"
                onClick={handleClick}
                variant="ghost"
                size="icon"
                className="absolute right-2 md:right-auto md:left-2 top-1/2 transform -translate-y-1/2"
                aria-label="Buscar"
            >
                <FaSearch/>
            </Button>

            { value && (
                <Button
                    type="button"
                    onClick={handleClear}
                    variant="ghost"
                    size="icon"
                    aria-label="Limpar busca"
                    className="absolute mr-10 md:mr-auto right-2 top-1/2 transform -translate-y-1/2"
                >
                    <FaTimes size={15}/>
                </Button>
                )    
            }

        </div>
    )

}