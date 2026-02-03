import { getSearch } from "@/src/services/searchService";
import { ArtistList } from "@/src/components/ArtistList/ArtistList";

interface ArtistsProps{
    searchParams:{
        q: string,
    },
};

export default async function Artists({searchParams}: ArtistsProps){

    const query = await searchParams;

    const q = query.q?.trim();

    if(!q){

        return(

            <div className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)] flex items-center justify-center flex-col">
                <div className="content-container">
                    <p className="text-center">Busque por artistas, álbuns ou músicas (ex: Aimyon, Aimer).</p>
                </div>
            </div>
        )

    }

    const data = await getSearch(q);
    const {artists} = data;

    return(

        <section className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)]">
            <div className="content-container">
                {artists.length ? (
                    <ArtistList artists={artists} />
                ):(
                    <div className="flex flex-col">
                        <h2 className="text-xl md:text-3xl font-bold text-center mt-5">Nenhum resultado.</h2>
                        <p className="text-subtext text-center mt-5">Tente uma nova busca</p>
                    </div>
                )}
            </div>
        </section>

    )

}