'use client'

import { SpotifyAlbum } from "@/src/types/spotify";
import { useState } from "react";
import { Button } from "../../Button/Button";
import { AlbumCard } from "../../AlbumCard/AlbumCard";
import Link from "next/link";

interface PreviewDiscographyProps{
    artistId: string,
    albums: SpotifyAlbum[],
    singleEps: SpotifyAlbum[],
};

export function PreviewDiscography({artistId, albums, singleEps}: PreviewDiscographyProps){

    const hasAlbums = albums.length > 0;
    const hasSingleEps = singleEps.length > 0;

    const [select, setSelect] = useState<"albums"|"singleEps">(hasAlbums ? "albums" : "singleEps"); 

    const currentData = select === "albums" ? albums : singleEps;

    return(

        <>
            {(hasAlbums || hasSingleEps) && (            
                <section className="mb-10">
                    <div className="flex items-end justify-between">
                        <h2 className="text-xl md:text-2xl font-bold">Discografia</h2>
                        <Link href={`/artist/${artistId}/discography`} className="text-sm md:text-base hover:text-white hover:underline text-neutral-400">Mostrar tudo</Link>
                    </div>
                    <div className="mt-5">
                        <div className="flex gap-2">
                            {hasAlbums && (
                                <Button
                                    variant="ghost"
                                    aria-label="Álbums"
                                    onClick={()=>setSelect("albums")}
                                    size="sm"
                                    className={`px-3 py-1 rounded-full
                                        ${select === "albums" ? "bg-white text-black pointer-events-none" : 
                                        "bg-white/10 text-white hover:bg-white/20 cursor-pointer"}
                                    `}
                                >
                                    Álbums
                                </Button>
                            )}
                            {hasSingleEps && (
                                <Button
                                    variant="ghost"
                                    aria-label="Singles/EPs"
                                    onClick={()=>setSelect("singleEps")}
                                    size="sm"
                                    className={`px-3 py-1 rounded-full
                                        ${select === "singleEps" ? "bg-white text-black pointer-events-none" : 
                                        "bg-white/10 text-white hover:bg-white/20 cursor-pointer"}
                                    `}
                                >
                                    Singles/EPs
                                </Button>
                            )}
                        </div>
                        <div className="mt-2 flex overflow-x-hidden -mx-3">
                            {currentData.map((album)=>(
                                <div key={album.id} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8">
                                    <AlbumCard  album={album} />
                                </div>    
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )

}