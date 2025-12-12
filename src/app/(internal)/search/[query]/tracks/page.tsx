import { getSearchData } from "@/services/searchService";
import { ListTrack } from "@/components/ListTrack/ListTrack";

interface SearchTracksProps{
    params:{
        query: string,
    },
};

export default async function searchAlbums({params}: SearchTracksProps){

    const { query } = await params;
    const data = await getSearchData(query);
    const { tracks } = data;

    return(

        <div className="min-h-screen w-full pt-[64px]">
            <div className="content-container pt-10 pb-20">
                <ListTrack tracks={tracks} />
            </div>
        </div>

    )

}