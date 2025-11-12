import { SpotifyTrack } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";

interface TrackCardProps{
    item: SpotifyTrack,
}

export function TrackCard({item}: TrackCardProps){

    return(
        
        <div className="p-4 hover:bg-white/5 rounded-xl hover:cursor-pointer">
            <div className="relative rounded-xl overflow-hidden aspect-square">
                <Image
                    src={item.album.images?.[0].url || ""}
                    alt={item?.name || "Tracks of week"}
                    fill
                    className="object-container transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
            </div>
            <div className="pt-3">
                <h1 className="font-semibold">{item.name}</h1>
                {item.artists.map((artist, index) => (
                    <span key={artist.id} className="text-white/60 text-sm">
                        <Link
                            className="hover:text-white hover:underline" 
                            href={`artist/${artist.id}`}
                        >
                            {artist.name}
                        </Link>
                        {index < item.artists.length - 1 && ', '}
                    </span>
                ))}
            </div>
            
        </div>

    )

}