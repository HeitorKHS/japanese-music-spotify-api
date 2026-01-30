import { getSearch } from "@/src/services/searchService";
import { TrackList } from "@/src/components/TrackList/TrackList";

interface TracksProps{
    searchParams:{
        q: string,
    },
};

export default async function Tracks({searchParams}: TracksProps){

    const query = await searchParams;

    const q = query.q?.trim();

    if(!q){

        return(

            <div className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)]">
                <div className="flex justify-center items-center">
                    <p>Busque por artistas, álbuns ou músicas (ex: Aimyon, Aimer).</p>
                </div>             
            </div>

        )

    }

    const data = await getSearch(q);
    const {tracks} = data;

    return(

        <section className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)]">
            <div className="content-container">
                {tracks.length > 0 ? (
                    <TrackList tracks={tracks} withImage={true} />
                ):(
                    <div className="flex flex-col">
                        <h2 className="text-xl md:text-3xl font-bold text-center mt-5">Nenhum resultado.</h2>
                        <p className="text-neutral-400 text-center mt-5">Tente uma nova busca</p>
                    </div>
                )}
                
            </div>
        </section>

    )

}