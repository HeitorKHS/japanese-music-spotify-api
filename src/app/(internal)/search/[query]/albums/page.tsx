import { getSearchData } from "@/services/searchService";
import Link from "next/link";
import Image from "next/image";

interface SearchAlbumsProps{
    params:{
        query: string,
    },
};

export default async function searchAlbums({params}: SearchAlbumsProps){

    const { query } = await params;
    const data = await getSearchData(query);
    const { albums } = data;

    return(

        <div className="min-h-screen w-full pt-[64px]">
            <div className="content-container pt-10 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                    {albums.map((album)=>(
                        <Link key={album.id} className="relative flex sm:flex-col gap-2" href={`/album/${album.id}`}>   
                            <div className="relative w-full max-w-[100px] sm:max-w-full aspect-square rounded-sm overflow-hidden">
                                <Image
                                    src={album.images?.[0].url || "/"}
                                    alt={album.name || "Album"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="flex-1 whitespace-nowrap overflow-hidden truncate">
                                <span>{album.name}</span>
                                <div className="text-white/60 text-sm first-letter:uppercase truncate">
                                    <span>{album.album_type}・</span>
                                    <span>{album.release_date}</span>
                                </div>
                            </div>            
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    )

}