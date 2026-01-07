import { getSearchData } from "@/src/services/searchService";
import Image from "next/image";
import Link from "next/link";
import { ArtistCard } from "@/src/components/ArtistCard/ArtistCard";
import { AlbumCard } from "@/src/components/AlbumCard/AlbumCard";
import { TrackList } from "@/src/components/TrackList";

interface SearchProps{
    params:{
        query: string,
    },
};

export default async function Search({params}: SearchProps){

    const { query } = await params;
    const data = getSearchData(query);
    const { artists, albums, tracks } = await data;

    return(

        <div className="my-10">
   
            <section className="inline-flex flex-col mb-10">
                <h1 className="text-xl md:text-2xl font-bold mb-4">Principal Resultado</h1>
                <div className="relative py-6 px-10 rounded-xl transition-colors hover:bg-neutral-800/70">
                    <div className="relative w-50 h-50 aspect-square rounded-full overflow-hidden">
                        <Image
                            src={artists?.[0].images?.[0].url || ""}
                            alt="Artist image"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <Link href={`/artist/${artists?.[0].id}`} draggable="false" className="after:absolute after:inset-0 after:z-10">
                            <span className="sr-only">Ver perfil de {artists?.[0].id}</span>
                        </Link>
                        <span className="text-2xl font-bold">{artists?.[0].name}</span>
                        <span className="text-lg text-white/60 first-letter:uppercase">{artists?.[0].type}</span>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h1 className="text-xl md:text-2xl font-bold mb-4 hover:underline"><Link href={`/search/${query}/artists`}>Artistas</Link></h1>
                <div className="flex overflow-x-hidden -mx-3">
                    {artists.map((artist)=>(
                        <div key={artist.id} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6">
                            <ArtistCard  artist={artist} />
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-10">
                <h1 className="text-xl md:text-2xl font-bold mb-4 hover:underline"><Link href={`/search/${query}/albums`}>Álbuns</Link></h1>
                <div className="flex overflow-x-hidden -mx-3">
                    {albums.map((album)=>(
                        <div key={album.id} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6">
                            <AlbumCard  album={album} />
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h1 className="text-xl md:text-2xl font-bold mb-4 hover:underline"><Link href={`/search/${query}/tracks`}>Músicas</Link></h1>
                <TrackList.withImage tracks={tracks.slice(0,5)} />
            </section>

        </div>

    )

}