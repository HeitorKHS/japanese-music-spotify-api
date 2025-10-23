import Image from "next/image";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {

  return (
    <div>
      <Header transparent/>
      <div className="min-h-screen h-screen w-full relative bg-gray-500">
        {/*<Image
          src=""
          alt="J-music Logo"
          fill
          className="object-cover"
          priority
        />*/}
      </div>
      <Footer/>
    </div>
  );
}
