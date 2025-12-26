import { SpotifyArtist } from "@/src/types/spotify";
import Link from "next/link";
import Image from "next/image";

interface ArtistCardProps{
    artist: SpotifyArtist,
};

export function ArtistCard({artist}: ArtistCardProps){

    return(

        <Link href={`/artist/${artist.id}`} className="group block p-2 md:p-4 rounded-xl hover:bg-white/5">
            <div className="relative max-w-75 rounded-xl overflow-hidden aspect-square">
                <Image 
                    src={artist.images?.[0].url || "/img/no_image.png"}
                    alt={artist?.name || "Imagem não encontrado"}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold pt-3 truncate">{artist.name}</h3>
                <span className="w-full text-sm text-white/50 capitalize truncate">{artist.type}</span>
            </div>
        </Link>   

    )

}