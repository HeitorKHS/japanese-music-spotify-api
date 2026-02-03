import { getArtistsPlaylist } from "@/src/services/playlistService";
import Image from "next/image";
import { ArtistList } from "@/src/components/ArtistList/ArtistList";

interface SectionProps{
    params:{
        id: string,
    },
};

export default async function Section({params}: SectionProps){

    const {id} = await params;
    const data = await getArtistsPlaylist(id);
    const {artistsPlaylist} = data;

    return(

        <div className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)]">

            {/*Hero*/}
            <div className="relative pt-15 md:pt-20 pb-5 overflow-hidden">

                {/*Playlist information*/}
                <div className="content-container">       
                    <div className="flex flex-col md:flex-row gap-8 md:items-end">
                    
                        {/*Playlist image*/}
                        <div className="relative max-w-60 w-full aspect-square rounded-xl overflow-hidden mx-auto">
                            <Image
                                src={artistsPlaylist.images?.[0].url || "/img/no_image.png"}
                                alt={artistsPlaylist.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/*Playlist detail*/}
                        <div className="flex-1">
                            <span className="text-sm font-semibold text-subtext uppercase tracking-wider">Playlist</span>
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">{artistsPlaylist.name}</h1>
                        </div>

                    </div>
                </div>
                
            </div>

            {/*Content*/}
            <div className="content-container py-10 md:py-15">

                {/*Playlist artists*/}
                <section>
                    <h2 className="text-xl md:text-2xl font-semibold">Artistas <span className="text-subtext">({artistsPlaylist.artists.length})</span></h2>
                    <ArtistList artists={artistsPlaylist.artists} />
                </section>

            </div>

        </div>

    )

}