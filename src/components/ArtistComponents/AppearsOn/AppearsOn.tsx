import { SpotifyAlbum } from "@/src/types/spotify";
import { AlbumLine } from "../../AlbumLine/AlbumLine";

interface AppearsOnProps{
    albums: SpotifyAlbum[],
};

export function AppearsOn({albums}: AppearsOnProps){

    return(

        <>
            {albums.length > 0 && (
                <section className="pt-5">
                    <h2 className="text-xl md:text-2xl font-semibold">Aparece em</h2>
                    <div className="mt-5">
                        <AlbumLine albums={albums} />     
                    </div>
                </section>
            )}
        </>

    )

}