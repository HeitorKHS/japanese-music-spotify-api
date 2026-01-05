import { getAlbumData } from "@/src/services/albumService";
import Image from "next/image";
import Link from "next/link";
import { useFormatTime } from "@/src/hooks/useFormatTime";
import { SpotifyTrack } from "@/src/types/spotify";
import { TrackList } from "@/src/components/TrackList";
import { FaSpotify } from "react-icons/fa";

interface AlbumProps{
    params:{
        id: string,
    },
};

export const AlbumDuration = (tracks: SpotifyTrack[]) => {

    const totalDuration = tracks.reduce((sum, track) => sum + track.duration_ms, 0);

    const formattedDuration = useFormatTime(totalDuration, "album");

    if (!tracks) return 0;

    return formattedDuration;
};

export default async function Album({params}: AlbumProps){

    const {id} = await params;
    const data = await getAlbumData(id);
    const { album } = data;

    return(

        <div>
            {/*Hero*/}
            <div className="relative min-h-[50vh] md:min-h-[60vh] overflow-hidden flex">
                    {/*Background Image*/}
                    <Image
                        src={album?.images?.[0].url || "/img/no_image.png"}
                        alt={album?.name || "Imagem não encontrado"}
                        fill
                        className="object-cover"
                        priority
                    />
                <div className="absolute inset-0 bg-linear-to-t from-[#171717] via-[#171717]/70 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#171717]/80 to-transparent" />

                {/*Album information*/}
                <div className="content-container z-10 flex flex-col md:flex-row items-center md:items-end gap-10 py-2">
                    <div className="relative w-full max-w-70 aspect-square rounded-xl overflow-hidden">
                        <Image
                            src={album?.images?.[0].url || "/img/no_image.png"}
                            alt={album?.name || "Imagem não encontrado"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-col items-start md:items-start">
                        <span className="capitalize text-neutral-500">{album?.album_type}</span>
                        <h1 className="mt-5 text-2xl md:text-4xl lg:text-5xl font-bold">{album?.name}</h1>
                        <div className="mt-5 flex flex-col md:flex-row text-neutral-500 text-sm font-semibold">
                            <div>
                                { album && album.artists.map((artist)=>(
                                    <span key={artist.id} className="text-white">
                                        <Link href={`/artist/${artist.id}`} className="hover:underline">{artist.name}</Link>
                                        ・
                                    </span>
                                ))}
                            </div>
                            <div>
                                <span>{album?.release_date ? new Date(album?.release_date).getFullYear() : ""}</span>・
                                <span>{album?.total_tracks} Músicas</span>・
                                <span>{AlbumDuration(album?.tracks.items ?? [])}</span>
                            </div>
                        </div>
                        <div className="mt-5 mb-2">
                            <Link 
                                href={album?.external_urls.spotify || "/"}
                                target="_blank"
                                rel="noopener noreferrer" //Privacity
                                className="inline-flex gap-4 items-center justify-center font-semibold bg-green-500 px-4 py-1 rounded-full"
                                >
                                <FaSpotify size={20}/>
                                Abra no Spotify                                
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/*Content*/}
            <div className="content-container my-20">
                <section>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Músicas</h2>
                    <TrackList.withOutImage tracks={album?.tracks.items || []} />
                </section>
            </div>
        </div>

    )

}