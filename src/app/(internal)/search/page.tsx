import { getSearch } from "@/src/services/searchService";
import { PreviewArtists } from "@/src/components/SearchComponents/PreviewArtists/PreviewArtists";
import { PreviewAlbums } from "@/src/components/SearchComponents/PreviewAlbums/PreviewAlbums";
import { PreviewTracks } from "@/src/components/SearchComponents/PreviewTracks/PreviewTracks";
import Link from "next/link";
import { ArtistCard } from "@/src/components/ArtistCard/ArtistCard";

interface SearchProps{
    searchParams:{
        q: string,
    },
};

export default async function Search({searchParams}: SearchProps){

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
    const {artists, albums, tracks} = data;

    return(

        <div className="min-h-[calc(100dvh-154px)] md:min-h-[calc(100dvh-120px)]">
            {artists.length <= 0 ? (
                <div className="flex flex-col">
                    <h2 className="text-xl md:text-3xl font-bold text-center mt-5">Nenhum resultado.</h2>
                    <p className="text-neutral-400 text-center mt-5">Tente uma nova busca</p>
                </div>
            ):(
                <div className="content-container my-10">

                    {/*Best result*/}
                    <section className="mt-5">
                        <h2 className="text-xl md:text-2xl font-semibold">Principal Resultado</h2>
                        <div className="max-w-70 -mx-3 mt-4">
                            <ArtistCard artist={artists[0]} />
                        </div>
                    </section>

                    {/*Artists*/}
                    <PreviewArtists artists={artists} q={q} />


                    {/*Albums*/}
                    <PreviewAlbums albums={albums} q={q} />


                    {/*Tracks*/}
                    <PreviewTracks tracks={tracks} q={q}/>

                </div>
            )}
        </div>

    )

}