import { Hero } from "../components/Hero/Hero";
import { Carousel } from "../components/Carousel/Carousel";
import { getHomeData } from "../services/playlistService";

export default async function Home() {

  const data = await getHomeData();
  const {tokyoArtists, rockArtists, womenArtists, rapArtists, indieArtists} = data;  

  return (

    <div>
      <Hero/>
      <Carousel title="Artista populares" artists={tokyoArtists.artists} link={`/section/${tokyoArtists.href}`}/>
      <Carousel title="Melhor do rock" artists={rockArtists.artists} link={`/section/${rockArtists.href}`}/>
      <Carousel title="Apenas mulheres" artists={womenArtists.artists} link={`/section/${womenArtists.href}`}/>
      <Carousel title="Destaques do rap" artists={rapArtists.artists} link={`/section/${rapArtists.href}`}/>
      <Carousel title="Indie Japonês" artists={indieArtists.artists} link={`/section/${indieArtists.href}`}/>
    </div>
    
  );
  
}
