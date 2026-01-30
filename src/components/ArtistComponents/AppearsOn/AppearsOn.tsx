import { SpotifyAlbum } from "@/src/types/spotify";
import { AlbumCard } from "../../AlbumCard/AlbumCard";

interface AppearsOnProps{
    albums: SpotifyAlbum[],
};

export function AppearsOn({albums}: AppearsOnProps){

    return(

        <>
            {albums.length > 0 && (
                <section className="pt-5">
                    <h2 className="text-xl md:text-2xl font-semibold">Aparece em</h2>
                    <div className="mt-5">
                        <div className="flex overflow-x-hidden -mx-3">
                            {albums.map((album)=>(
                                <div key={album.id} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8">
                                    <AlbumCard  album={album}/>
                                </div>
                            ))}
                        </div>            
                    </div>
                </section>
            )}
        </>

    )

}