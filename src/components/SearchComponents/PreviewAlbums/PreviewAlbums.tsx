import { SpotifyAlbum } from "@/src/types/spotify";
import { AlbumCard } from "../../AlbumCard/AlbumCard";
import Link from "next/link";

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
                        <div className="flex overflow-x-hidden -mx-3">
                            {albums.map((album)=>(
                                <div key={album.id} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6">
                                    <AlbumCard album={album} />
                                </div>
                            ))}
                        </div>
                     </div>
                </section>
            )}
        </>


    )
    
}