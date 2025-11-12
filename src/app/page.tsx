import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getHomeData } from "@/services/homeService";
import { Hero } from "@/components/Hero/Hero";
import { ArtistCaroulseSection } from "@/components/Carousel/ArtistCarouselSection";
import { TrackCarouselSection } from "@/components/Carousel/TrackCarouselSection";

export default async function Home() {

  const data = await getHomeData();

  return (
    <div>
      <Header transparent/>
      <Hero artist={data.featuredArtistOfDay} />
      <ArtistCaroulseSection 
        artists={data.featuredArtistsOfWeek} 
        title={"Top 10 artistas da semana"} 
      /> 
      <TrackCarouselSection
        tracks={data.featuredTracksOfWeek}
        title={"Top 10 músicas da semana"}
      />
      <TrackCarouselSection
        tracks={data.featuredWomenTracks}
        title={"Vocal Feminino"}
      />
      <Footer/>
    </div>
  );
}
