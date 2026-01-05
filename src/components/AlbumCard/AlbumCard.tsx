import { SpotifyAlbum } from "@/src/types/spotify";
import Link from "next/link";
import Image from "next/image";

interface AlbumCardProps{
    album: SpotifyAlbum,
};

export function AlbumCard({album}: AlbumCardProps){

    return(

        <div className="relative p-3 rounded-xl transition-colors hover:bg-neutral-800/70">
            <div className="relative max-w-75 aspect-square rounded-xl overflow-hidden">
                <Image
                    src={album.images?.[0].url || "/img/not_found.png"}
                    alt={album.name ? `${album.name}` : "Imagem não encontrado"}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <Link href={`/album/${album.id}`} draggable="false" className="after:absolute after:inset-0 after:z-10">
                    <span className="sr-only">Ver o álbum {album.name}</span>
                </Link>
                <h3 className="text-sm font-semibold pt-3 truncate">{album.name}</h3>
                <span className="text-sm text-white/50 capitalize">{album.type}</span>
            </div>
        </div>

        /*<Link href={`/album/${album.id}`} className="block p-3 hover:bg-white/5 rounded-xl transition-colors group-[]:">
            <div className="relative max-w-75 aspect-square rounded-xl overflow-hidden">
                <Image
                    src={album.images?.[0].url || "/img/not_found.png"}
                    alt={album.name ? `${album.name}` : "Imagem não encontrado"}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
            <h3 className="text-sm font-semibold pt-3 truncate">{album.name}</h3>
            <span className="text-sm text-white/50 capitalize">{album.type}</span>
            </div>
        </Link>*/

    )

}