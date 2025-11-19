import { SpotifyArtist } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";

interface ArtistCard{
    item: SpotifyArtist,
}

export function ArtistCard( {item}: ArtistCard){

    return(

        <div className="p-4 hover:bg-white/5 rounded-xl hover:cursor-pointer">
            <Link href={`artist/${item.id}`}>
                <div className="relative rounded-full overflow-hidden aspect-square">
                    <Image
                        src={item?.images?.[0].url || ""}
                        alt={item?.name || "Artist of week"}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                </div>
                <p className="pt-3 font-semibold text-center">{item.name}</p>
            </Link>
        </div>

    )

}