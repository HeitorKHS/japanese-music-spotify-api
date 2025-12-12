import { getSearchData } from "@/services/searchService";
import Link from "next/link";
import Image from "next/image";

interface SearchArtistsProps{
    params:{
        query: string,
    },
};

export default async function searchArtists({params}: SearchArtistsProps){

    const { query } = await params;
    const data = await getSearchData(query);
    const { artists } = data;

    return(

        <div className="min-h-screen w-full pt-[64px]">
            <div className="content-container pt-10 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {artists.map((artist)=>(
                        <Link key={artist.id} className="relative flex sm:flex-col gap-2" href={`/artist/${artist.id}`}>   
                            <div className="relative w-full max-w-[100px] sm:max-w-full aspect-square rounded-full overflow-hidden">
                                <Image
                                    src={artist.images?.[0].url || "/"}
                                    alt={artist.name || "Album"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex-1 whitespace-nowrap overflow-hidden truncate">
                                <span>{artist.name}</span>
                                <div className="text-white/60 text-sm first-letter:uppercase truncate">
                                    <span>{artist.type}</span>
                                </div>
                            </div>            
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    )

}