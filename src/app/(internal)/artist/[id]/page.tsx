import { getArtistData } from "@/services/artistService";
import { ListTrack } from "@/components/listTrack/ListTrack";
import { ListAlbum } from "@/components/listAlbum/ListAlbum";
import Image from "next/image";
import Link from "next/link";

interface ArtistProps{
    params: {
        id: string,
    },
};

export default async function Artist({params}: ArtistProps){

    const { id } = await params;
    const data = await getArtistData(id);
    const { artist, topTracks, fiveAlbums, fiveSinglesAndEps, fiveAppearsOn } = data;

    console.log(fiveAlbums);

    return(

        <div className="min-h-screen w-full">
            
            {/*Artist hero*/}
            <div className="relative h-[calc(100vh-59px)] md:h-[calc(100vh-64px)] flex items-end">
                {/*Image background*/}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={artist?.images?.[0].url || ""}
                        alt={artist?.name || "Artist"}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="overlay z-10"/>
                {/*Content hero*/}
                <div className="content-container flex flex-col md:flex-row items-center md:items-end pb-20 gap-10 z-20">
                    <div className="relative aspect-square w-full max-w-[300px] border-3 border-white/30 rounded-3xl overflow-hidden">
                        <Image
                            src={artist?.images?.[0].url || ""}
                            alt={artist?.name || "Artist"}
                            fill
                            className="object-cover "
                            priority
                        />     
                    </div>
                    <div>
                        <h1 className="text-4xl sm:text-5xl md:text-8xl font-semibold pb-5">{artist?.name}</h1>
                        <h2 className="text-lg text-gray-300 pb-5">{artist?.followers?.total.toLocaleString('pt-BR')} Seguidores</h2>
                    </div>
                </div>

            </div>

            {/*Content artist*/}
            <div className="content-container">

                {/*Artist top tracks*/}
                <div className="pb-15">
                    <h2 className="text-2xl md:text-3xl font-semibold pb-5">Populares</h2>
                    <ListTrack tracks={topTracks} />
                </div>

                {/*Artist albums, singles and EPs*/}
                <div className="md:pt-10 pb-15">
                    <div className="flex items-end justify-between pb-5">
                        <h2 className="text-2xl md:text-3xl font-semibold">Discografia</h2>
                        <Link href={"/"} className="text-sm md:text-base hover:text-white hover:underline text-white/60"> Mostrar tudo</Link>
                    </div>             
                    <div className="pt-5">
                        <h3 className="text-xl">Álbuns</h3>
                        <ListAlbum albums={fiveAlbums}/>
                    </div>                
                    <div className="pt-5">
                        <h3 className="text-xl">Singles e Eps</h3>
                        <ListAlbum albums={fiveSinglesAndEps}/>
                    </div>         
                </div>

                {/*Appears on*/}
                <div className="md:pt-10 pb-15">
                    <div className="flex items-end justify-between pb-5">
                        <h2 className="text-2xl md:text-3xl font-semibold">Aparece em</h2>
                        <Link href={"/"} className="text-sm md:text-base hover:text-white hover:underline text-white/60"> Mostrar tudo</Link>
                    </div>
                    
                    <div className="pt-5 pb-10">
                        <ListAlbum albums={fiveAppearsOn}/>
                    </div>                      
                </div>
            </div>

        </div>

    )

}