import { Hero } from "../components/Hero/Hero";
import { getHomeData } from "../services/playlistService";
import { Carousel } from "../components/Carousel/Carousel";
import { SPOTIFY_PLAYLISTS } from "../constants/spotify";

export default async function Home() {

  const data = await getHomeData();
  const { tokyoArtits, indieArtits, womenArtits, rapArtits, rockArtits } = data;

  return (

    <>
      <Hero/>
      <Carousel title="Artista populares" artists={tokyoArtits} link={`/section/${SPOTIFY_PLAYLISTS.TOKYO_SUPER_HITS}`}/>
      <Carousel title="Melhor do rock" artists={rockArtits} link={`/section/${SPOTIFY_PLAYLISTS.ROCK_JAPAN}`}/>
      <Carousel title="Apenas mulheres" artists={womenArtits} link={`/section/${SPOTIFY_PLAYLISTS.JAPANESE_WOMEN}`}/>
      <Carousel title="Destaques do rap" artists={rapArtits} link={`/section/${SPOTIFY_PLAYLISTS.RAP_JAPAN}`}/>
      <Carousel title="Indie Japonês" artists={indieArtits} link={`/section/${SPOTIFY_PLAYLISTS.INDIE_JAPAN}`}/>
    </>
    
  );
  
}
