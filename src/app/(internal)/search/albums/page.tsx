import { getSearch } from "@/src/services/searchService";
import { AlbumList } from "@/src/components/AlbumList/AlbumList";

interface AlbumsProps{
    searchParams:{
        q: string,
    },
};

export default async function Albums({searchParams}: AlbumsProps){

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
    const {albums} = data;

    return(

        <section className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)]">
            <div className="content-container">
                {albums.length > 0 ? (
                    <AlbumList albums={albums} />
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