import { getSearchData } from "@/src/services/searchService";
import { ArtistCard } from "@/src/components/ArtistCard/ArtistCard";

interface ArtistsProps{
    params:{
        query: string,
    },
};

export default async function Artists({params}: ArtistsProps){

    const { query } = await params;
    const data = getSearchData(query);
    const { artists } = await data;

    return(

        <section className="my-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 -mx-3">
                {artists.map((artist)=>(
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
        </section>

    )

}