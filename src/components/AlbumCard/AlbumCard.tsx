import { SpotifyAlbum } from "@/src/types/spotify";
import Link from "next/link";
import Image from "next/image";

interface AlbumCardProps{
    album: SpotifyAlbum,
};

export function AlbumCard({album}: AlbumCardProps){

    return(

        <Link href={`/album/${album.href}`} className="block ">
            <div className="relative max-w-75 aspect-square rounded-xl overflow-hidden">
                <Image
                    src={album.images?.[0].url || "/img/not_found.png"}
                    alt={album.name ? `${album.name}` : "Imagem não encontrado"}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
            <h3 className="font-semibold pt-3 truncate">{album.name}</h3>
            <span className="text-sm text-white/50 capitalize">{album.type}</span>
            </div>
        </Link>

    )

}