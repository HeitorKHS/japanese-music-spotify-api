import { getArtistData } from "@/src/services/artistService";
import Image from "next/image";
import Link from "next/link";
import { LuTrendingUp, LuUsers } from "react-icons/lu";
import { FaSpotify } from "react-icons/fa";
import { PreviewDiscography } from "@/src/components/ArtistComponents/PreviewDiscography/PreviewDiscography";
import { AppearsOn } from "@/src/components/ArtistComponents/AppearsOn/AppearsOn";
import { TopTracks } from "@/src/components/ArtistComponents/TopTracks/TopTracks";

interface ArtistProps{
    params:{
        id: string,
    },
};

export default async function Artist({params}: ArtistProps){

    const {id} = await params;
    const data = await getArtistData(id);
    const {artist, topTracks, albumsPreview, singlesEpsPreview, appearsOnPreview} = data;

    return(

        <div className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)]">
            
            {/*Hero*/}
            <div className="relative h-[60dvh] overflow-hidden">

                {/*Background color*/}
                <div className="absolute inset-0 z-10"> 
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-900 md:from-neutral-900/70 via-neutral-900/10 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-neutral-900/70 md:from-neutral-900 md:via-neutral-900 to-transparent"/>
                </div>

                {/*Background Image*/}
                <div className="absolute right-0 top-0 bottom-0 left-0 md:left-1/2">
                    <Image
                        src={artist?.images?.[0].url || "/img/no_image.png"}
                        alt={artist?.name || "Imagem não encontrado"}
                        fill
                        className="object-cover object-[0_30%]"
                        priority
                    />
                </div>

                {/*Artist Info*/}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div className="content-container pb-5">
                        <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-5">{artist?.name}</h1>
                        <div className="hidden md:flex flex-wrap items-center gap-5 text-neutral-400 mb-5">
                            <div className="flex items-center gap-3">
                                <LuTrendingUp/>
                                <span>{artist?.popularity}/100 de popularidade</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <LuUsers/>
                                <span>{artist?.followers?.total.toLocaleString("pt-BR")} Seguidores</span>
                            </div>
                        </div>

                        {/*Spotify Link*/}
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
            <div className="content-container py-10 md:py-15">

                {/*Popular tracks*/}
                <TopTracks tracks={topTracks} />

                {/*Discography*/}
                <PreviewDiscography artistId={artist?.id || ""} albums={albumsPreview} singleEps={singlesEpsPreview} />

                {/*Appears on*/}
                <AppearsOn albums={appearsOnPreview} />

            </div>

        </div>

    )

}