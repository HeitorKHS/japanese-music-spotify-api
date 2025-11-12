'use client'

import { SpotifyArtist } from "@/types/spotify";
import { Carousel } from "./Carousel";
import { ArtistCard } from "./components/ArtistCard";

interface ArtistCaroulseSectionProps{
    artists: SpotifyArtist[],
    title: string,
}

export function ArtistCaroulseSection({artists, title}: ArtistCaroulseSectionProps){

    return(
        <Carousel
            items={artists}
            title={title}
            ItemComponent={ArtistCard}
            keyExtractor={(artist) => artist.id}
        />
    )

}