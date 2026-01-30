import { SpotifyTrack } from "@/src/types/spotify";
import { TrackList } from "../../TrackList/TrackList";
import Link from "next/link";

interface PreviewTracksProps{
    tracks: SpotifyTrack[],
    q: string,
};

export function PreviewTracks({tracks, q}: PreviewTracksProps){

    return(

        <>
            {tracks.length > 0 && (
                <section className="mt-5">
                    <h2 className="text-xl md:text-2xl font-semibold"><Link href={`/search/tracks?q=${q}`}>Músicas</Link></h2>
                    <div className="mt-4">
                        <TrackList tracks={tracks} withImage={true} />
                    </div>
                </section>
            )}
        </>


    )

}