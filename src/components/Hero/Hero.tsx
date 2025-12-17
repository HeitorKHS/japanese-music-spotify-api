import { SpotifyArtist } from "@/src/types/spotify";
import Image from "next/image";
import Link from "next/link";
import { FaSpotify, FaInfoCircle } from "react-icons/fa";

interface HeroProps{
    artist: SpotifyArtist | null,
};

export function Hero({ artist }: HeroProps){

    return(

        <div className="relative h-[calc(100svh-64px)] w-full">
            {/*Image hero backgroud*/}
            <Image
                src={"/img/hero.jpg"}
                alt={"Hero backgroud"}
                fill
                className="object-cover -z-10"
                priority
            />
            <div className="overlay z-10" />
            {/*Hero content*/}
            <div className="relative content-container h-full flex flex-col items-center justify-center gap-8 z-20">
                <span className="text-white/60 text-xl font-semibold">Artista em destaque</span>
                <div className="relative w-full max-w-80 aspect-square rounded-full overflow-hidden">
                    <Image
                        src={artist?.images?.[0].url || "/img/no_image.png"}
                        alt={"Artist image"}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold">{artist?.name}</h1>
                <div className="flex flex-col gap-2">
                    <Link 
                        href={artist?.id ? `/artist/${artist.id}` : "/"}
                        className="flex gap-4 items-center justify-center font-bold px-6 py-3 rounded-full bg-white/5 hover:scale-105"
                    >
                        <FaInfoCircle size={20}/>
                        Ver detalhes do artista
                    </Link>
                    <Link 
                        href={artist?.external_urls.spotify || "/"}
                        target="_blank"
                        rel="noopener noreferrer" //Privacity
                        className="flex gap-4 items-center justify-center bg-green-500 font-bold px-6 py-3 rounded-full hover:scale-105"
                    >
                        <FaSpotify size={20}/>
                        Abra no Spotify
                    </Link>
                </div>
            </div>
        </div>

    ) 

}