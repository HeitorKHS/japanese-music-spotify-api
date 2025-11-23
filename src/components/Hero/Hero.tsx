import { SpotifyArtist } from "@/types/spotify"
import { FaStar, FaSpotify } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { LuUsers, LuTrendingUp, LuInfo } from "react-icons/lu";


interface HeroProps{
    artist: SpotifyArtist | null,
}

export function Hero( {artist}: HeroProps){
    
    return(

        <div className="relative min-h-screen flex items-center">
            {/*Image background*/}
            <Image
                src={"/img/hero.jpg"}
                alt={"Hero background"}
                fill
                className="object-cover -z-10"
                priority
            />
            <div className="overlay z-10" />
            {/*Artist information*/}
            <div className="content-container grid md:grid-cols-2 gap-10 pt-[59px] md:pt-[64px] z-20">
                {/*Artist details*/}
                <div className="flex flex-col justify-center pt-[59px] md:pt-[64px]">
                    <div className="inline-flex w-fit mb-15 border border-[#fa1e67]/30 rounded-2xl py-2 px-4 backdrop-blur-sm bg-[#fa1e67]/30">                      
                        <span className="flex items-center gap-2 font-bold uppercase"><FaStar className="text-yellow-400"/>Artista da semana</span>
                    </div>
                    <h1 className="font-semibold text-3xl sm:text-5xl mb-8">{artist?.name}</h1>
                    <div className="flex gap-6 mb-8">
                        <div className="flex-1 border border-white/30 p-4 rounded-lg background-blur-sm bg-white/5">
                            <span className="flex items-center gap-3 text-white/30 font-semibold mb-2 text-sm"><LuUsers size={20} className="text-red-300"/>Seguidores</span>
                            <span className="font-semibold text-lg sm:text-2xl">{artist?.followers?.total.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="flex-1 border border-white/30 p-4 rounded-lg background-blur-sm bg-white/5">
                            <span className="flex items-center gap-3 text-white/30 font-semibold mb-2 text-sm"><LuTrendingUp size={20} className="text-green-300"/>Populares</span>
                            <span className="font-semibold text-lg sm:text-2xl">{artist?.popularity} /100</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-5 mb-8">
                        {artist?.genres ? (
                            artist?.genres?.map((genre) => (
                                <div key={genre} className="border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <span className="uppercase font-semibold text-sm">{genre}</span>
                                </div>
                            ))) : (
                                <span>Nenhum gênero disponível</span>
                            )
                        }
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <Link 
                            href={`/artist/${artist?.id} || "/"`}
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
                            Abra no Spotify
                        </Link>
                    </div>
                </div>
                {/*Artist image*/}
                <div className="flex justify-center md:justify-end">
                    <div className="relative aspect-square w-full max-w-[500px] border-3 border-white/30 rounded-3xl overflow-hidden">
                        <Image
                            src={artist?.images?.[0].url || ""}
                            alt={artist?.name || "Artist"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    
    )

}