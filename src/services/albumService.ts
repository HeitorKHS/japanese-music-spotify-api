import { AlbumRepository } from "../repositories/albumRepository";
import { SpotifyAlbum } from "../types/spotify";

interface AlbumData{
    album: SpotifyAlbum,
};

export async function getAlbumData(albumId: string): Promise<AlbumData>{

    const album = await AlbumRepository.getAlbum(albumId);

    return{
        album: album,
    }

}