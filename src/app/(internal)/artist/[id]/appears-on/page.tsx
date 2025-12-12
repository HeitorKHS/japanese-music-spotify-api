import { getArtistData } from "@/services/artistService";
import Image from "next/image";
import Link from "next/link";

interface ArtistAppearsOnProps{
    params: {
        id:string,
    },
};

export default async function ArtistAppearsOn({params}: ArtistAppearsOnProps){

    const { id } = await params;
    const data = await getArtistData(id);
    const { allArtistAlbumsAppearsOn, artist } = data;

    return(

        <div className="min-h-screen w-full">
            {/*Hero*/}
            <div className="relative h-[500px] flex items-center">
                <Image
                    src={artist?.images?.[0].url || "/"}
                    alt={artist?.name || "Artist"}
                    fill
                    className="object-cover -z-10"
                    priority
                />
                <div className="overlay z-10" />
                {/*Content hero*/}
                <div className="content-container relative flex flex-col md:flex-row items-center md:items-end gap-10 pt-[20px] md:pt-[64px] z-20">
                    <div className="relative w-full max-w-[280px] aspect-square border-3 border-white/30 rounded-3xl overflow-hidden">
                        <Image
                            src={artist?.images?.[0].url || "/"}
                            alt={artist?.name || "Artist"}
                            fill
                            className="object-cover -z-10"
                            priority
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        <span className="text-4xl font-semibold pb-5">{artist?.name}</span>
                        <span className="text-white/60 text-lg pb-5">{allArtistAlbumsAppearsOn.length} álbuns</span>
                    </div>

                </div>
            </div>
            {/*Albums*/}
            <div className="content-container pt-10 pb-20">
                <h1 className="text-2xl md:text-3xl font-semibold pb-5">Aparece em</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {allArtistAlbumsAppearsOn.map((album)=>(
                        <Link key={album.id} className="relative flex sm:flex-col gap-2" href={`/album/${album.id}`}>   
                            <div className="relative w-full max-w-[100px] sm:max-w-full aspect-square rounded-sm overflow-hidden">
                                <Image
                                    src={album.images?.[0].url || "/"}
                                    alt={album.name || "Album"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex-1 whitespace-nowrap overflow-hidden truncate">
                                <span>{album.name}</span>
                                <div className="text-white/60 text-sm first-letter:uppercase truncate">
                                    <span>{album.album_type}・</span>
                                    <span>{album.release_date}</span>
                                </div>
                                <span className="text-white/60 text-sm ">{album.total_tracks} Músicas</span>
                            </div>            
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    )

}