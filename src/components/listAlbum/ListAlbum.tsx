import { SpotifyAlbum } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";

interface ListAlbumProps{
    albums: SpotifyAlbum[],
}

export function ListAlbum({albums}: ListAlbumProps){

    return(

        <div className="flex overflow-x-hidden -mx-4">
            {albums.map((album)=>(
                <div key={album.id} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 hover:bg-white/5 rounded-xl hover:cursor-pointer">
                    <Link href={`/album/${album.id}`}>                   
                        <div className="relative aspect-square w-full">
                            <Image
                                src={album?.images?.[0].url || ""}
                                alt={album?.name || "Album"}
                                fill
                                className="object-container rounded-2xl"
                                priority
                            />
                        </div>
                        <div className="pt-3">
                            <h3 className="truncate" title={album.name}>
                                {album.name}
                            </h3>
                            <div className="text-white/60 text-sm flex">
                                <span>{album.release_date}・<span className="capitalize">{album.album_type}</span></span>    
                            </div>
                        </div>   
                    </Link>                  
                </div>
            ))}
        </div>

    )

}