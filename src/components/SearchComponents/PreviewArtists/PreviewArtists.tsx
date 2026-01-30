import { SpotifyArtist } from "@/src/types/spotify";
import { ArtistCard } from "../../ArtistCard/ArtistCard";
import Link from "next/link";

interface PreviewArtistsProps{
    artists: SpotifyArtist[],
    q: string,
};

export function PreviewArtists({artists, q}: PreviewArtistsProps){

    return(

        <>
            {artists.length > 0 && (
                <section className="mt-5">
                    <h2 className="text-xl md:text-2xl font-semibold"><Link href={`/search/artists?q=${q}`}>Artistas</Link></h2>
                    <div className="mt-4">
                        <div className="flex overflow-x-hidden -mx-3">
                            {artists.map((artist) => (
                                <div key={artist.id} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6">
                                    <ArtistCard artist={artist} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            )}
        </>


    )

}