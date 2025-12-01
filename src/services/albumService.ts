import { getAlbumById, getRelatedAlbums } from "@/repositories/albumRepository";
import { SpotifyAlbum } from "@/types/spotify";

export interface AlbumData{
    album: SpotifyAlbum | null,
    relatedAlbums: SpotifyAlbum[],
}

export async function getAlbumData(albumId: string): Promise<AlbumData> {

    try{

        const [ album ] = await Promise.all([
            getAlbumById(albumId),
        ]);

        const artistId = album.artists?.[0].id;

        let relatedAlbums: SpotifyAlbum[] = [];

        if(artistId){
            relatedAlbums = await getRelatedAlbums(artistId);
        }

        return{
            album,
            relatedAlbums,
        }

    } catch(error){
        console.error('Erro ao buscar dados do álbum:', error);
        return{
            album: null,
            relatedAlbums: [],
        }
    }

}