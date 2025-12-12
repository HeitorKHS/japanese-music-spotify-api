import { SpotifyArtist } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";

interface ListArtistProps{
    artists: SpotifyArtist[],
}

export function ListArtist({artists}: ListArtistProps){

    return(

        <div className="flex overflow-x-hidden -mx-4">
            {artists.map((artist)=>(
                <div key={artist.id} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 hover:bg-white/5 rounded-xl hover:cursor-pointer">
                    <Link href={`/album/${artist.id}`}>                   
                        <div className="relative aspect-square w-full">
                            <Image
                                src={artist?.images?.[0].url || ""}
                                alt={artist?.name || "Album"}
                                fill
                                className="object-container rounded-full"
                                priority
                            />
                        </div>
                        <div className="pt-3">
                            <h3 className="truncate" title={artist.name}>
                                {artist.name}
                            </h3>
                            <div className="text-white/60 text-sm flex">
                                <span>{artist.type}</span>    
                            </div>
                        </div>   
                    </Link>                  
                </div>
            ))}
        </div>

    )

}