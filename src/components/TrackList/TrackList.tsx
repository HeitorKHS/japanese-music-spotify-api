import { SpotifyTrack } from "@/src/types/spotify";
import { IoMdTime } from "react-icons/io";
import { FormatTime } from "@/src/utils/formatTime";
import Image from "next/image";
import Link from "next/link";
import { LuListMusic } from "react-icons/lu";

interface TrackListProps{
    tracks: SpotifyTrack[],
    withImage: boolean,
};

export function TrackList({tracks, withImage}: TrackListProps){

    return(

        <>
            {tracks.length > 0 && (
                <div className="mt-5">
                    <div>
                        <div className="hidden sm:flex items-center p-2 text-neutral-400 font-semibold text-sm">
                            <div className="w-5"><span>#</span></div>
                            <div className="flex-1"><span>Título</span></div>
                            <div><IoMdTime size={20} /></div>
                        </div>
                        {tracks.map((track, index) => (
                            <div key={track.id} className="flex items-center p-2 gap-2 transition-colors duration-500 hover:bg-neutral-800/70 rounded-sm">
                                <div className="w-5">{index+1}</div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex items-center gap-3">
                                        {withImage && (
                                            <Link href={`/album/${track.album.id}`} className="relative h-9 aspect-square rounded-sm overflow-hidden">
                                                <Image
                                                    src={track.album?.images?.[0].url || "/img/no_image.png"}
                                                    alt={track.album.name ? track.album.name : "Imagem não encontrado"}
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </Link>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col">
                                                <Link 
                                                    href={track.external_urls.spotify} 
                                                    target="_blank"
                                                    rel="noopener noreferrer" //Privacity
                                                    className="w-fit truncate"
                                                >
                                                    {track.name}
                                                </Link>
                                                <span className="truncate text-neutral-400">
                                                    {track.artists.map((artist) => (
                                                        <span key={artist.id}>
                                                            <Link href={`/artist/${artist.id}`} className="hover:underline">{artist.name}</Link>
                                                            {index < track.artists.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>{FormatTime(track.duration_ms, "track")}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>

    )

}