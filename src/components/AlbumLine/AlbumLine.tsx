'use client'

import { SpotifyAlbum } from "@/src/types/spotify";
import { AlbumCard } from "../AlbumCard/AlbumCard";
import { useState, useEffect, useCallback } from "react";

interface AlbumLineProps{
    albums: SpotifyAlbum[],
};

export function AlbumLine({albums}: AlbumLineProps){

    const [visible, setVisible] = useState<number>(6);
    
    const getItemsVisible = useCallback(() => {
    
        if (typeof window === "undefined") return 6;
        if (window.innerWidth >= 1280) return 6;   
        if (window.innerWidth >= 768) return 4;  
        if (window.innerWidth >= 640) return 3;  
        return 2;                       
    
    }, []); 
       
    useEffect(()=>{
    
        const handleResize = () => {
            const visibleItems =getItemsVisible();
            setVisible(visibleItems);
        }
    
        handleResize();
    
        window.addEventListener("resize", handleResize);
         return () => window.removeEventListener("resize", handleResize);
    
    }, [getItemsVisible]);

    return(

        <div className="flex overflow-hidden gap-4">
            {albums.slice(0, visible).map((album)=>(
                <div key={album.id} className="flex-1 min-w-0">
                    <AlbumCard album={album} />
                </div>
            ))}
        </div>

    )

}