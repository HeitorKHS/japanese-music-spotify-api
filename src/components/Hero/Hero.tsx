import { SpotifyArtist } from "@/types/spotify"
import Image from "next/image";

interface HeroProps{
    artist: SpotifyArtist | null;
}

export function Hero( {artist}: HeroProps){

    console.log(artist);

    return(

        <div className="min-h-screen w-full relative">
            <Image
                src={"/img/hero.jpg"}
                alt={"Hero Image"}
                layout="fill"
                objectFit="cover"
                priority
            />  
            <div>

            </div>
        </div>

    )

}