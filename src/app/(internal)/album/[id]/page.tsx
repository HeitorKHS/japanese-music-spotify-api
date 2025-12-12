import { getAlbumData } from "@/services/albumService";
import { SpotifyTrack } from "@/types/spotify";
import { useFormatTime } from "@/hooks/useFormatTime";
import { ListTrackAlbum } from "@/components/ListTrack/listTrackAlbum";
import { ListAlbum } from "@/components/ListAlbum/ListAlbum";
import Image from "next/image";
import Link from "next/link";

interface AlbumProps{
    params:{
        id: string,
    },
};

export const sumAlbumDuration = (tracks: SpotifyTrack[]) => {

    if(!tracks) return 0;

    const totalDuration = tracks.reduce((sum, track) => sum + track.duration_ms, 0)

    return useFormatTime(totalDuration, "album");

}

export default async function Album({params}: AlbumProps){

    const { id } = await params;
    const data = await getAlbumData(id);
    const { album, relatedAlbums } = data;

    return(

        <div className="min-h-screen w-full">

            {/*Album hero*/}
            <div className="relative h-[500px] flex items-center">
                {/*Image background*/}
                <Image
                    src={album?.images?.[0].url || "/"}
                    alt={album?.name || "Album"}
                    fill
                    className="object-cover -z-10"
                    priority
                />
                <div className="overlay z-10"/>
                {/*Content hero*/}
                <div className="content-container relative flex flex-col md:flex-row items-center md:items-end gap-10 pt-[20px] md:pt-[64px] z-20">
                    <div className="relative w-full max-w-[280px] aspect-square border-3 border-white/30 rounded-3xl overflow-hidden">
                        <Image
                            src={album?.images?.[0].url || "album"}
                            alt={album?.name || "album"}
                            fill
                            className="object-cover -z-10"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        {album && album.artists.map((artist, index) => (
                            <span key={artist.id} className="text-white/60 md:pb-5">
                                <Link
                                    className="hover:text-white hover:underline" 
                                    href={`/artist/${artist.id}`}
                                >
                                    {artist.name}
                                </Link>
                                {index < album.artists.length - 1 && ', '}
                            </span>
                        ))}
                        <span className="text-lg md:text-7xl font-extrabold md:pb-5">{album?.name}</span>
                        <div className="text-white/60 text-sm first-letter:uppercase md:pb-5">
                            <span>{album?.album_type}・</span>
                            <span>{album?.release_date}・</span>
                            <span>{album?.total_tracks} músicas・</span>
                            <span>{sumAlbumDuration(album?.tracks.items ?? [])}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*Content album*/}
            <div className="content-container pt-10 pb-15">
                <div className="pt-5">
                    <h2 className="text-2xl md:text-3xl font-semibold pb-5">Tracklist</h2>
                    <ListTrackAlbum tracks={album?.tracks.items || []} />
                </div>
                <div className="pt-20">
                    <h3 className="text-xl">Álbuns similares</h3>
                    <ListAlbum albums={relatedAlbums} />
                </div>
            </div>

        </div>

    )

}