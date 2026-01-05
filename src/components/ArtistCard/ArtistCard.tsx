import { SpotifyArtist } from "@/src/types/spotify";
import Link from "next/link";
import Image from "next/image";

interface ArtistCardProps{
    artist: SpotifyArtist,
};

export function ArtistCard({artist}: ArtistCardProps){

    return(

        <div className="relative group p-3 rounded-xl border border-neutral-800/50 hover:border-pink-400/30 bg-neutral-800/50 transition-all duration-300">
            <div className="relative max-w-75 aspect-square rounded-xl overflow-hidden">
                <Image
                    src={artist.images?.[0].url || "/img/no_image.png"}
                    alt={artist.name ? `${artist.name}` : "Imagem não encontrado"}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <Link href={`/artist/${artist.id}`} draggable="false" className="after:absolute after:inset-0 after:z-10">
                    <span className="sr-only">Ver perfil de {artist.name}</span>
                </Link>
                <h3 className="font-semibold pt-3 truncate group-hover:text-pink-400 transition-colors">{artist.name}</h3>
                <span className="w-full text-sm text-white/50 capitalize truncate">{artist.type}</span>
            </div>
        </div>

        /*<Link href={`/artist/${artist.id}`} className="block group p-3 rounded-xl border border-neutral-800/50 hover:border-pink-400/30 bg-neutral-800/50 transition-all duration-300">
            <div className="relative max-w-75 rounded-xl overflow-hidden aspect-square">
                <Image 
                    src={artist.images?.[0].url || "/img/no_image.png"}
                    alt={artist?.name || "Imagem não encontrado"}
                    fill
                    className="object-cover transition-transform duration-400 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col">
                <h3 className="font-semibold pt-3 truncate group-hover:text-pink-400 transition-colors">{artist.name}</h3>
                <span className="w-full text-sm text-white/50 capitalize truncate">{artist.type}</span>
            </div>
        </Link>*/   

    )

}