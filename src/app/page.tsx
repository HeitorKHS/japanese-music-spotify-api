import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getHomeData } from "@/services/homeService";
import { Hero } from "@/components/Hero/Hero";
import { ArtistCaroulseSection } from "@/components/Carousel/ArtistCarouselSection";
import { TrackCarouselSection } from "@/components/Carousel/TrackCarouselSection";

export default async function Home() {

  const data = await getHomeData();
  const { featuredArtistOfDay, featuredArtistsOfWeek, featuredTracksOfWeek, featuredWomenTracks, featuredRockTracks } = data;
  return (
    <div>
      <Hero artist={featuredArtistOfDay} />
      <ArtistCaroulseSection 
        artists={featuredArtistsOfWeek} 
        title={"Top 10 artistas da semana"} 
      /> 
      <TrackCarouselSection
        tracks={featuredTracksOfWeek}
        title={"Top 10 músicas da semana"}
      />
      <TrackCarouselSection
        tracks={featuredWomenTracks}
        title={"Vocal Feminino"}
      />
      <TrackCarouselSection
        tracks={featuredRockTracks}
        title={"O melhor do rock japonês"}
      />
    </div>
  );
}
