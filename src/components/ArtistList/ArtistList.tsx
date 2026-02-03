import { SpotifyArtist } from "@/src/types/spotify";
import { ArtistCard } from "../ArtistCard/ArtistCard";

interface ArtistListProps{
    artists: SpotifyArtist[],
};

export function ArtistList({artists}: ArtistListProps){

    return(

        <div className="mt-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {artists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>
        </div>

    )

}