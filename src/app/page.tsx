import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { getHomeData } from "@/services/homeService";
import { Hero } from "@/components/Hero/Hero";


export default async function Home() {

  const data = await getHomeData();

  return (
    <div>
      <Header transparent/>
      <Hero artist={data.featuredArtistOfDay} />
      <Footer/>
    </div>
  );
}
