import { getArtistData } from "@/src/services/artistService"
import Image from "next/image";
import { LuUsers, LuTrendingUp } from "react-icons/lu";
import { TrackList } from "@/src/components/TrackList";

interface ArtistProps{
    params:{
        id: string,
    },
};

export default async function Artist({params}: ArtistProps){

    const { id } = await params;
    const data = await getArtistData(id);
    const { artist, topTracks } = data;

    return(

        <div className="min-h-[calc(100svh-64px)]">

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
                <div className="content-container z-10 flex flex-col justify-end text-white">
                    <span className="mb-2 capitalize text-white/60">{artist?.type}</span>
                    <h1 className="mb-4 m-0 text-4xl md:text-6xl lg:text-7xl font-bold">{artist?.name}</h1>
                    <div className="mb-2 flex flex-wrap items-center sm:gap-6 text-white/60">
                        <div className="flex items-center gap-2">
                            <LuTrendingUp/>
                            {artist?.popularity}/100 de popularidade
                        </div>
                        <div className="flex items-center gap-2">
                            <LuUsers/>
                            {artist?.followers?.total.toLocaleString("pt-BR")} Seguidores
                        </div>
                    </div>
                </div>
            </div>

            {/*Content*/}
            <div className="content-container">

                <div className="mt-20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Músicas Populares</h2>
                    <TrackList.withImage tracks={topTracks} />
                </div>

            </div>
        </div>

    )

}