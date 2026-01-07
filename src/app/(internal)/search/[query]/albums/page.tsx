import { getSearchData } from "@/src/services/searchService";
import { AlbumCard } from "@/src/components/AlbumCard/AlbumCard";

interface AlbumsProps{
    params:{
        query: string,
    },
};

export default async function Albums({params}: AlbumsProps){

    const {query} = await params;
    const data = getSearchData(query);
    const {albums} = await data;

    return(

        <section className="my-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 -mx-3">
                {albums.map((album)=>(
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>
        </section>

    )

}