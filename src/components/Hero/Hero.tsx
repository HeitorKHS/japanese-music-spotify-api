import { SpotifyArtist } from "@/types/spotify"
import { FaStar, FaSpotify } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { LuUsers, LuTrendingUp, LuInfo } from "react-icons/lu";


interface HeroProps{
    artist: SpotifyArtist | null;
}

export function Hero( {artist}: HeroProps){

    console.log(artist);

    return(

        <div className="relative min-h-screen w-full">

            {/*Background Hero*/}
            <div className="absolute inset-0 z-0">
                <Image
                    src={"/img/hero.jpg"}
                    alt={"Hero Background"}
                    fill
                    className="Object-cover"
                    priority
                />  
            </div>

            <div className="overlay z-10"></div>
            
            {/*Artist information*/}
            <div className="relative flex min-h-screen pt-[59px] md:pt-[64px] z-20">
                <div className="custom-container pt-20 pb-15 md:grid md:grid-rows-1 md:grid-cols-2 gap-10 items-center">
                    {/*Left information*/}
                    <div className="flex flex-col gap-6">

                        <div className="inline-flex items-center w-fit gap-2 border border-[#fa1e67]/30 rounded-2xl py-2 px-4 backdrop-blur-sm bg-[#fa1e67]/30">
                            <FaStar className="text-yellow-400"/>
                            <h2 className="font-bold uppercase">Artista da semana</h2>
                        </div>

                        <h1 className="font-semibold text-5xl mt-10">{artist?.name}</h1>

                        <div className="flex flex-wrap gap-6 mt-5"> 
                            <div className="flex-1 border border-white/30 p-4 rounded-lg background-blur-sm bg-white/5">
                                <span className="flex items-center gap-3 text-lg text-gray-300 font-semibold mb-2"><LuUsers size={20} className="text-red-300"/>Seguidores</span>
                                <span className="font-semibold text-2xl">{artist?.followers?.total.toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="flex-1 border border-white/30 p-4 rounded-lg background-blur-sm bg-white/5">
                                <span className="flex items-center gap-3 text-lg text-gray-300 font-semibold mb-2"><LuTrendingUp size={20} className="text-green-300"/>Popularidade</span>
                                <span className="font-semibold text-2xl">{artist?.popularity} /100</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            { artist?.genres ? ( artist?.genres.map((genre, index)=>(
                                    <div key={index} className="border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                        <span className="uppercase font-semibold text-sm">{genre}</span>
                                    </div>
                                ))) : (
                                    <p>Nenhum gênero disponível</p>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 mt-15">
                            <Link
                                href={`/artist/${artist?.id || "/"}`}
                                className="flex-1 flex gap-4 items-center justify-center border boder-bg-white/30 font-bold px-6 py-3 rounded-full background-blur-sm bg-white/5"
                            >
                                <LuInfo size={20}/>
                                Ver detalhes do artista
                            </Link>
                            <Link 
                                href={artist?.external_urls.spotify || "/"}
                                target="_blank"
                                rel="noopener noreferrer" //Privacity
                                className="flex-1 flex gap-4 items-center justify-center bg-green-500 font-bold px-6 py-3 rounded-full"
                            >
                                <FaSpotify size={20}/>
                                Abra no spotify
                            </Link>
                        </div>
                    </div>
             
                    {/*Image right*/}
                    <div className="relative flex justify-center md:justify-end pt-20 md:pt-0">
                        <div className="relative aspect-square w-full max-w-[500px] border-3 border-white/30  rounded-3xl overflow-hidden">
                            <Image
                                src={artist?.images?.[0].url || ""}
                                alt={artist?.name || "Artist of week"}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                
                </div>

            </div>
        </div>

    )

}