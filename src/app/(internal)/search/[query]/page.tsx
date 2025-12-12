import { getSearchData } from "@/services/searchService";
import Image from "next/image";
import Link from "next/link";
import { ListTrack } from "@/components/ListTrack/ListTrack";
import { ListArtist } from "@/components/ListArtist/ListArtist";
import { ListAlbum } from "@/components/ListAlbum/ListAlbum";

interface SearchProps{
    params:{
        query: string,
    },
};

export default async function Search({params}: SearchProps){

    const { query } = await params;
    const data = await getSearchData(query);
    const { artists, albums, tracks } = data;

    return(

        <div className="min-h-screen w-full pt-[64px]">
            <div className="content-container">

                <div className="mt-10">
                    <h1 className="text-2xl md:text-3xl font-semibold">Principal resultados</h1>
                    <div className="pt-10">
                        <Link href={`/artist/${artists?.[0].id}`}>  
                            <div className="px-8 py-5 bg-white/2 flex items-center flex-col md:flex-row gap-10 rounded-3xl">                      
                                <div className="relative w-full max-w-[200px] aspect-square">
                                    <Image
                                        src={artists?.[0].images?.[0].url || ""}
                                        alt="Artist image"
                                        fill
                                        className="object-cover rounded-full"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold">{artists?.[0].name}</span>
                                    <span className="text-lg text-white/60 first-letter:uppercase">{artists?.[0].type}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-10">
                    <Link href={`/search/${query}/tracks`} className="text-2xl md:text-3xl font-semibold">Músicas</Link>
                    <div className="pt-10">
                        <ListTrack tracks={tracks.slice(0,5)} />
                    </div>
                </div>

                <div className="mt-10">
                    <Link href={`/search/${query}/artists`} className="text-2xl md:text-3xl font-semibold">Artistas</Link>
                    <div className="pt-10">
                        <ListArtist artists={artists.slice(0,5)} />
                    </div>
                </div>

                <div className="mt-10">
                    <Link href={`/search/${query}/albums`} className="text-2xl md:text-3xl font-semibold">Álbuns</Link>
                    <div className="pt-10">
                        <ListAlbum albums={albums.slice(0,5)} />
                    </div>
                </div>

            </div>
        </div>
    )

}