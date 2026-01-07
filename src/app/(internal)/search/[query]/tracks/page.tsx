import { getSearchData } from "@/src/services/searchService";
import { IoMdTime } from "react-icons/io";
import { TrackList } from "@/src/components/TrackList";

interface TracksProps{
    params:{
        query: string,
    },
};

export default async function Tracks({params}: TracksProps){

    const {query} = await params;
    const data = getSearchData(query);
    const {tracks} = await data;

    return(

        <section className="my-5">
            <div>
                <div className="flex items-center p-2 gap-5 text-neutral-500 font-semibold text-sm">
                    <div className="w-5">#</div>
                    <div className="flex-1">Título</div>
                    <div><IoMdTime size={20} /></div>
                </div>
            </div>
            
            <TrackList.withImage tracks={tracks} />
        
        </section>
    )

}