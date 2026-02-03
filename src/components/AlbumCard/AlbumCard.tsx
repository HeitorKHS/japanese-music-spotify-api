import { SpotifyAlbum } from "@/src/types/spotify";
import Image from "next/image";
import Link from "next/link";

interface AlbumCardProps{
    album: SpotifyAlbum,
};

export function AlbumCard({album}: AlbumCardProps){

    return(

        <div className="group relative rounded-xl transition-colors overflow-hidden">
            <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                    src={album.images?.[0].url || "/img/no_image.png"}
                    alt={album.name ? `${album.name}` : "Imagem não encontrado"}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-50"
                />
            </div>
            <div className="space-y-1 mt-4">
                <Link href={`/album/${album.id}`} draggable="false" className="after:absolute after:inset-0 after:z-10">
                    <span className="sr-only">Ver o álbum {album.name}</span>
                </Link>
                <h3 className="font-semibold truncate">{album.name}</h3>
                <span className="w-full text-sm text-subtext capitalize truncate">{album.type}</span>
            </div>
        </div>

    )

}