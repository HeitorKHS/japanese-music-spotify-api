'use client'

import { SpotifyAlbum } from "@/src/types/spotify";
import { useState } from "react";
import { Button } from "../../Button/Button";
import Link from "next/link";
import { AlbumLine } from "../../AlbumLine/AlbumLine";

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
                        <Link href={`/artist/${artistId}/discography`} className="text-sm md:text-base hover:text-black dark:hover:text-white hover:underline text-subtext">Mostrar tudo</Link>
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
                                        ${select === "albums" ? "bg-foreground text-background pointer-events-none" : 
                                        "bg-neutral-600/40 text-foreground cursor-pointer"}
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
                                        ${select === "singleEps" ? "bg-foreground text-background pointer-events-none" : 
                                        "bg-neutral-600/40 text-foreground cursor-pointer"}
                                    `}
                                >
                                    Singles/EPs
                                </Button>
                            )}
                        </div>
                        <div className="mt-5">
                            <AlbumLine albums={currentData} />
                        </div>
                    </div>
                </section>
            )}
        </>
    )

}