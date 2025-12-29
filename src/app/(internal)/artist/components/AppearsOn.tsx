import { SpotifyAlbum } from "@/src/types/spotify";
import { AlbumCard } from "@/src/components/AlbumCard/AlbumCard";

interface AppearsOnProps{
    albums: SpotifyAlbum[],
};

export function AppearsOn({albums}: AppearsOnProps){

    return(

        <div className="flex overflow-x-hidden -mx-3">
            {albums.map((album)=>(
                <div key={album.id} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8">
                    <AlbumCard  album={album} />
                </div>
            ))}
        </div>

    )

}