import { getArtistsFromPlaylist } from "@/src/services/playlistService";
import Image from "next/image";
import { ArtistCard } from "@/src/components/ArtistCard/ArtistCard";

interface SectionProps{
    params:{
        id:string,
    },
};

export default async function Section({params}: SectionProps){

    const { id } = await params;
    const data = await getArtistsFromPlaylist(id);
    const { artistPlaylist } = data;
    
    return(

        <div>
            {/*Hero*/}
            <div className="relative min-h-[50vh] md:min-h-[60hv] overflow-hidden flex">
                {/*Background Hero*/}
                <div className="absolute inset-0 bg-pink-900" />
                <div className="absolute inset-0 bg-linear-to-t from-[#171717] via-[#171717]/70 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#171717]/80 to-transparent" />
                {/*Info*/}
                <div className="content-container flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-4 z-10 py-2">
                    <div className="relative max-w-60 w-full aspect-square rounded-2xl overflow-hidden">
                        <Image
                            src={artistPlaylist.images?.[0].url || "/img/image.png"}
                            alt={artistPlaylist.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <h1 className="md:mb-5 text-2xl md:text-4xl lg:text-5xl font-bold">{artistPlaylist.name}</h1>
                </div>
            </div>
            {/*Content*/}
            <div className="content-container mt-20 mb-20">
                <section>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Artistas</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                        {artistPlaylist.artists.map((artist)=>(
                            <ArtistCard key={artist.id} artist={artist} />
                        ))}
                    </div>
                </section>
            </div>
        </div>

    )

}