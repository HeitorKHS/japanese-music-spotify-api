import { SpotifyTrack } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";
import { IoPlay } from "react-icons/io5";

interface listTrackProps{
    tracks: SpotifyTrack[],
}

export const formatDuration = (ms: number) => {

    const minutes = Math.floor(ms / 60000); 
    const seconds = Math.floor((ms % 60000) / 1000); 
    
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}:${formatSeconds}`

}

export function ListTrack({tracks}: listTrackProps){

    return(

        <div>
            {
                tracks.map((track, index)=>(
                    <div key={track.id} className="flex md:px-3 py-3 gap-5 items-center">
                        <div className="w-[20px]">{index + 1}</div>
                        <div className="relative aspect-square w-full max-w-[50px] rounded-lg overflow-x-hidden">
                            <Link href={`/album/${track.album.id}`}>
                                <Image
                                    src={track?.album.images?.[0].url || ""}
                                    alt={track?.name || "Track"}
                                    fill
                                    className="object-container"
                                    priority
                                />
                            </Link>
                        </div>
                        <div className="flex-1 whitespace-nowrap overflow-hidden">
                            <h3 className="truncate">{track.name}</h3>
                            {track.artists.map((artist, index) => (
                                <span key={artist.id} className="text-white/60 text-sm">
                                    <Link
                                        className="hover:text-white hover:underline" 
                                        href={`/artist/${artist.id}`}
                                    >
                                        {artist.name}
                                    </Link>
                                    {index < track.artists.length - 1 && ', '}
                                </span>
                            ))}
                        </div>                       
                        <div>{formatDuration(track.duration_ms)}</div>
                        <IoPlay/>
                    </div>
                ))}
        </div>

    )

}