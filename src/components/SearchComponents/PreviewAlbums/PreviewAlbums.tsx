import { SpotifyAlbum } from "@/src/types/spotify";
import Link from "next/link";
import { AlbumLine } from "../../AlbumLine/AlbumLine";

interface PreviewAlbumsProps{
    albums: SpotifyAlbum[],
    q: string,
};

export function PreviewAlbums({albums, q}: PreviewAlbumsProps){

    return(

        <>
            {albums.length > 0 && (
                <section className="mt-5">
                    <h2 className="text-xl md:text-2xl font-semibold"><Link href={`/search/albums?q=${q}`}>Álbuns</Link></h2>
                    <div className="mt-4">
                        <AlbumLine albums={albums} />    
                    </div>
                </section>
            )}
        </>


    )
    
}