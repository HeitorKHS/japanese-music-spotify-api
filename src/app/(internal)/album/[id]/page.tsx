import { getAlbumData } from "@/src/services/albumService";
import Image from "next/image";
import Link from "next/link";
import { FormatTime } from "@/src/utils/formatTime";
import { SpotifyTrack } from "@/src/types/spotify";
import { FaSpotify } from "react-icons/fa";
import { TrackList } from "@/src/components/TrackList/TrackList";

interface AlbumProps{
    params:{
        id: string,
    },
};

export const AlbumDuration = (tracks: SpotifyTrack[]) => {

    const totalDuration = tracks.reduce((sum, track) => sum + track.duration_ms, 0);

    const formattedDuration = FormatTime(totalDuration, "album");

    if (!tracks) return 0;

    return formattedDuration;
};

export default async function Album({params}: AlbumProps){

    const {id} = await params;
    const data = await getAlbumData(id);
    const {album} = data;

    return(

        <div className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)]">

            {/*Hero*/}
            <div className="relative pt-15 md:pt-20 pb-5 overflow-hidden">

                {/*Album information*/}
                <div className="content-container">
                    <div className="flex flex-col md:flex-row gap-8 md:items-end">

                        {/*Album image*/}
                        <div className="relative max-w-60 w-full aspect-square rounded-xl overflow-hidden mx-auto">
                            <Image
                                src={album?.images?.[0].url || "/img/no_image.png"}
                                alt={album?.name || "Imagem não encontrado"}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/*Album detail*/}
                        <div className="flex-1">
                            <span className="text-sm md:text-base font-semibold text-subtext uppercase tracking-wider">
                                {album?.artists.map((artist, index) => (
                                    <span key={artist.id} className="hover:text-white transition duration-500">
                                        <Link href={`/artist/${artist.id}`} >{artist.name}</Link>
                                        {index < album.artists.length - 1 && ", "}
                                    </span>
                                ))}
                            </span>
                            <h1 className="mt-2 text-2xl md:text-4xl lg:text-5xl font-bold">{album?.name}</h1>
                            <div className="mt-2 hidden md:flex flex-wrap items-center gap-2 text-sm md:text-base text-subtext">
                                <span>{album && new Date(album.release_date).getFullYear()} ・</span>
                                <span>{album?.total_tracks} Músicas・</span>
                                <span>{album && AlbumDuration(album.tracks.items)}</span>
                            </div>

                            {/*Spotify Link*/}
                            <Link 
                                href={album?.external_urls.spotify || "/"}
                                target="_blank"
                                rel="noopener noreferrer" //Privacity
                                className="inline-flex gap-4 items-center justify-center font-semibold bg-green-500 px-4 py-1 rounded-full mt-2 mb-4"
                            >
                                <FaSpotify size={20}/>
                                Abra no Spotify                                
                            </Link>

                        </div>

                    </div>
                </div>

            </div>

            {/*Content*/}
            <div className="content-container py-10 md:py-20">
                
                {/*Album Tracks*/}
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold">Músicas  <span className="text-subtext">({album.tracks.items.length})</span></h2>
                    <TrackList tracks={album?.tracks.items} withImage={false}/>
                </section>

            </div>

        </div>

    )

}