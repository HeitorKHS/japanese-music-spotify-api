import { SpotifyAlbum } from "@/src/types/spotify";
import { AlbumCard } from "../AlbumCard/AlbumCard";

interface AlbumListProps{
    albums: SpotifyAlbum[],
};

export function AlbumList({albums}: AlbumListProps){

    return(

        <div className="mt-5">       
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {albums.map((album)=>(
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>
        </div>
        
    )

}