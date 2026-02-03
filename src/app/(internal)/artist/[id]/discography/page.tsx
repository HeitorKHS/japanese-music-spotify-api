import { getAllAlbums } from "@/src/services/artistService";
import Image from "next/image";
import Link from "next/link";
import { FullDiscography } from "@/src/components/ArtistComponents/FullDiscography/FullDiscography";

interface DiscographyProps{
    params:{
        id: string,
    },
};

export default async function Discography({params}: DiscographyProps){

    const {id} = await params;
    const data = await getAllAlbums(id, 0);
    const {albums, artist} = data;

    return(

        <div className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)]">

            {/*Hero*/}
            <div className="relative h-[60dvh] overflow-hidden">

                {/*Background color*/}
                <div className="absolute inset-0 z-10"> 
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-900 md:from-neutral-900/70 via-neutral-900/10 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-neutral-900/70 md:from-neutral-900 md:via-neutral-900 to-transparent"/>
                </div>

                {/*Background Image*/}
                <div className="absolute right-0 top-0 bottom-0 left-0 md:left-1/2">
                    <Image
                        src={artist?.images?.[0].url || "/img/no_image.png"}
                        alt={artist?.name || "Imagem não encontrado"}
                        fill
                        className="object-cover object-[0_30%]"
                        priority
                    />
                </div>

                {/*Artist info*/}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div className="content-container bottom-0 md:pb-5">
                        <span className="text-sm md:text-base font-semibold text-neutral-400 uppercase tracking-wider">Discografia</span>
                        <Link href={`/artist/${artist?.id}`}><h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mt-2">{artist?.name}</h1></Link>
                    </div>
                </div>

            </div>

            {/*Content*/}
            <div className="content-container py-10 md:py-20">
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold">Álbuns <span className="text-subtext">({albums.total})</span></h2>
                    <FullDiscography artistId={artist.id} initialAlbums={albums} /> 
                </section>
            </div>

        </div>

    )

}