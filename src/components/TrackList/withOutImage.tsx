import { SpotifyTrack } from "@/src/types/spotify";
import { useFormatTime } from "@/src/hooks/useFormatTime";
import Link from "next/link";

interface withOutImageProps{
    tracks: SpotifyTrack[],
};

export function withOutImage({tracks}: withOutImageProps){

    return(

        <div>
            {tracks.map((track, index)=>(
                <div key={track.id} className="flex items-center p-2 gap-5">
                    <div className="w-5">{index + 1}</div>
                    <div className="flex-1 flex items-center gap-3 min-w-0 overflow-hidden">
                        <div className="flex flex-col text-sm flex-1 overflow-hidden">
                            <span className="truncate">{track.name}</span>
                            <div className="text-neutral-500 truncate">
                                {track.artists.map((artist, index)=>(
                                    <span key={artist.id}>
                                            <Link href={artist.id} className="hover:underline">{artist.name}</Link>
                                            {index < track.artists.length - 1 && ", "}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        {useFormatTime(track.duration_ms, "track")}
                    </div>
                </div>
            ))}
        </div>

    )

}