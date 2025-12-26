import { SpotifyAlbum } from "../types/spotify";
import { getAlbum } from "../repositories/albumRepository";

interface AlbumData{
    album: SpotifyAlbum | null,
};

export async function getAlbumData(albumId: string): Promise<AlbumData>{

    try{

        const [ album, ] = await Promise.all([
            getAlbum(albumId),
        ]);

        return{
            album: album,
        };

    } catch(error){

        console.error('Erro ao buscar dados do artista: ', error);

        return{
            album: null,
        };

    }

}