import { getArtistData } from "@/src/services/artistService"
import Image from "next/image";
import Link from "next/link";
import { LuUsers, LuTrendingUp } from "react-icons/lu";
import { FaSpotify } from "react-icons/fa";
import { TrackList } from "@/src/components/TrackList";
import { Discography } from "../components/Discography";
import { AppearsOn } from "../components/AppearsOn";

interface ArtistProps{
    params:{
        id: string,
    },
};

export default async function Artist({params}: ArtistProps){

    const { id } = await params;
    const data = await getArtistData(id);
    const { artist, topTracks, albumsPreview, singlesEpsPreview, appearsOnPreview } = data;

    return(

        <div>

            {/*Hero*/}
            <div className="relative min-h-[50vh] md:min-h-[60vh] overflow-hidden flex">
                {/*Background Image*/}
                <Image
                    src={artist?.images?.[0].url || "/img/no_image.png"}
                    alt={artist?.name || "Imagem não encontrado"}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#171717] via-[#171717]/70 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#171717]/80 to-transparent" />

                {/*Artist Info*/}
                <div className="content-container z-10 flex flex-col justify-end text-white py-2">
                    <div className="relative max-w-55 aspect-square rounded-full overflow-hidden">
                        <Image
                            src={artist?.images?.[0].url || "/img/no_image.png"}
                            alt={artist?.name || "Imagem não encontrado"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span className="capitalize text-white/60">{artist?.type}</span>
                    <h1 className="mb-4 m-0 text-4xl md:text-6xl lg:text-7xl font-bold">{artist?.name}</h1>
                    <div className="flex flex-wrap items-center sm:gap-6 text-white/60">
                        <div className="flex items-center gap-2">
                            <LuTrendingUp/>
                            {artist?.popularity}/100 de popularidade
                        </div>
                        <div className="flex items-center gap-2">
                            <LuUsers/>
                            {artist?.followers?.total.toLocaleString("pt-BR")} Seguidores
                        </div>
                    </div>
                    <div className="mt-5 mb-2">
                        <Link 
                            href={artist?.external_urls.spotify || "/"}
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

            {/*Content*/}
            <div className="content-container">

                <section className="mt-20 mb-20">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Músicas Populares</h2>
                    <TrackList.withImage tracks={topTracks} />
                </section>

                <section className="mb-20">
                    <div className="mb-4 flex items-end justify-between">
                        <h2 className="text-xl md:text-2xl font-bold">Discografia</h2>
                        <Link href={`/artist/${artist?.id}/albums`} className="text-sm md:text-base hover:text-white hover:underline text-white/60">Mostrar tudo</Link>
                    </div>
                    <Discography albums={albumsPreview} singleEps={singlesEpsPreview} />
                </section>

                { appearsOnPreview && appearsOnPreview.length > 0 && <section className="mb-20">
                    <div className="mb-4 flex items-end justify-between">
                        <h2 className="text-xl md:text-2xl font-bold">Aparece em</h2>
                        <Link href={`/artist/${artist?.id}/albums`} className="text-sm md:text-base hover:text-white hover:underline text-white/60">Mostrar tudo</Link>
                    </div>
                    <AppearsOn albums={appearsOnPreview} />
                </section>}

            </div>
        </div>

    )

}