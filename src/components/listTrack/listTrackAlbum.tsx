import { SpotifyTrack } from "@/types/spotify";
import { useFormatTime } from "@/hooks/useFormatTime";
import Link from "next/link";
import { IoPlay } from "react-icons/io5";
import { RiTimeLine } from "react-icons/ri";

interface listTracklbumProps{
    tracks: SpotifyTrack[],
}

export function ListTrackAlbum({tracks}: listTracklbumProps){

    return(

        <div>
            <div className="flex md:px-3 py-3 gap-5 items-center text-white/60">
                <span className="w-[20px]">#</span>
                <div className="flex-1 whitespace-nowrap overflow-hidden">
                    <span>Título</span>        
                </div>
                <span className="pr-11"><RiTimeLine/></span>
            </div>
            {
                tracks.map((track, index)=>(
                    <div key={track.id} className="flex md:px-3 py-3 gap-5 items-center">
                        <div className="w-[20px]">{index + 1}</div>
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
                        <div>{useFormatTime(track.duration_ms, "track")}</div>
                        <IoPlay/>
                    </div>
                ))}
        </div>

    )

}