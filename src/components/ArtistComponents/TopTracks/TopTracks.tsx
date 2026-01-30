import { SpotifyTrack } from "@/src/types/spotify";
import { TrackList } from "../../TrackList/TrackList";

interface TopTracksProps{
    tracks: SpotifyTrack[],
};

export function TopTracks({tracks}: TopTracksProps){

    return(

        <>
            {tracks.length > 0 && (
                <section className="pb-10">
                    <h2 className="text-xl md:text-2xl font-semibold">Músicas Populares</h2>
                    <TrackList tracks={tracks} withImage={true} />
                </section>
            )}
        </>

    )


}