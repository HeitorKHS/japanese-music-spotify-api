import { Hero } from "../components/Hero/Hero";
import { getHomeData } from "../services/playlistService";

export default async function Home() {

  const data = await getHomeData();
  const { featuredArtist } = data;

  return (

    <>
      <Hero artist={featuredArtist} />
    </>
    
  );
  
}
