'use client'

import { SpotifyTrack } from "@/types/spotify";
import { Carousel } from "./Carousel";
import { TrackCard } from "./components/TrackCard";

interface TrackCarouselSectionProps{
    tracks: SpotifyTrack[],
    title: string,
}

export function TrackCarouselSection({tracks, title}: TrackCarouselSectionProps){

    return(

        <Carousel
            items={tracks}
            title={title}
            ItemComponent={TrackCard}
            keyExtractor={(track) => track.id}
        />

    )

}