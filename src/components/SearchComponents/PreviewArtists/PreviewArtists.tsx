'use client'

import { SpotifyArtist } from "@/src/types/spotify";
import { ArtistCard } from "../../ArtistCard/ArtistCard";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface PreviewArtistsProps{
    artists: SpotifyArtist[],
    q: string,
};

export function PreviewArtists({artists, q}: PreviewArtistsProps){

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

        <>
            {artists.length > 0 && (
                <section className="mt-5">
                    <h2 className="text-xl md:text-2xl font-semibold"><Link href={`/search/artists?q=${q}`}>Artistas</Link></h2>
                    <div className="mt-4">
                        <div className="flex overflow-hidden gap-4">
                            {artists.slice(0, visible).map((artist) => (
                                <div key={artist.id} className="flex-1 min-w-0">
                                    <ArtistCard artist={artist} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            )}
        </>


    )

}