'use client'

import { SpotifyAlbum } from "@/src/types/spotify";
import { useState } from "react";
import { AlbumCard } from "@/src/components/AlbumCard/AlbumCard";

interface DiscographyProps{
    albums: SpotifyAlbum[],
    singleEps: SpotifyAlbum[],
};

export function Discography({albums, singleEps}: DiscographyProps){

    const [select, setSelect] = useState<"albums"|"singleEps">("albums");

    const currentData = select === "albums" ? albums : singleEps;

    return(

        <div>

            <div className="flex gap-2">
                <button
                    onClick={()=>setSelect("albums")}
                    className={`px-3 py-1 rounded-full text-sm md:text-base
                            ${select === "albums" ? "bg-white text-black" : 
                            "bg-white/10 text-white hover:bg-white/20 cursor-pointer"}
                    `}
                >
                    Álbums
                </button>
                <button
                    onClick={()=>setSelect("singleEps")}
                    className={`px-3 py-1 rounded-full text-sm md:text-base 
                            ${select === "singleEps" ? "bg-white text-black" : 
                            "bg-white/10 text-white hover:bg-white/20 cursor-pointer"}
                    `}
                >
                    Singles/EPs
                </button>
            </div>
            
            <div className="mt-2 flex overflow-x-hidden -mx-3">
                {currentData.map((album)=>(
                    <div key={album.id} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 p-3 hover:bg-white/5 rounded-xl hover:cursor-pointer transition-colors">
                        <AlbumCard  album={album} />
                    </div>
                    
                ))}
            </div>

        </div>

    )

}