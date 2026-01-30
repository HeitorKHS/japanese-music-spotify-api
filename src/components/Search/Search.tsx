import { BiSearch, BiX } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";


export function Search(){

    const [value, setValue] = useState<string>("");
    const router = useRouter();

    const handleClear = () => {

        setValue("");

    };

    const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {

        if(e.key === "Enter" && value.trim()){
            e.currentTarget.blur();
            router.push(`/search?q=${encodeURIComponent(value.trim())}`);
        };

    };

    return(

        <div className="relative">
            <BiSearch className="absolute left-2 top-1/2 -translate-y-1/2"/>
            <label htmlFor="search-input" className="sr-only">Buscar artistas, músicas ou álbuns...</label>
            <input 
                type="search" 
                placeholder="Artistas, Músicas e álbuns"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                onKeyDown={handleEnter}
                className="px-8 py-1 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-pink-500 focus:outline-none transition-all duration-400"
            />
            {value && (
                <Button
                    variant="ghost"
                    size="lg"
                    aria-label="Limpar busca"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                    <BiX size={20}/>
                </Button>
            )}
        </div>

    )

}