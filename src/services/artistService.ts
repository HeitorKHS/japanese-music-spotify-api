import { SpotifyArtist, SpotifyAlbum, SpotifyTrack, SpotifyPagination } from "../types/spotify";
import { ArtistRepository } from "../repositories/artistRepository";

interface ArtistData{
    artist: SpotifyArtist | null,
    topTracks: SpotifyTrack[],
    albumsPreview: SpotifyAlbum[],
    singlesEpsPreview: SpotifyAlbum[],
    appearsOnPreview: SpotifyAlbum[],
}

interface AlbumData{
    albums: SpotifyPagination<SpotifyAlbum>,
    artist: SpotifyArtist,
};

async function getTopTracks(artistId: string){
    
    try{
        return await ArtistRepository.getTopTracks(artistId);
    } catch(error){
        console.error(`[Spotify Service] Falha ao carregar top tracks do artista ${artistId}:`, error);
        return [];
    }
    
}

async function getAlbums(artistId: string, offset: number, limit: number, group: string): Promise<SpotifyAlbum[]>{

    try{
        const response = await ArtistRepository.getAlbums(artistId, offset, limit, group);
        return response.items.slice(0, 8);
    } catch(error){
        console.error(`[Spotify Service] Falha ao carregar álbums do artista ${artistId}:`, error);
        return [];
    }

}

export async function getArtistData(artistId: string): Promise<ArtistData>{

    const [artistData, topTracks, albumsPreview, singlesEpsPreview, appearsOnPreview] = await Promise.all([
        ArtistRepository.getArtist(artistId),
        getTopTracks(artistId),
        getAlbums(artistId, 0, 20, "album"),
        getAlbums(artistId, 0, 20, "single"),
        getAlbums(artistId, 0, 20, "appears_on"),
    ]);

    return{
        artist: artistData,
        topTracks: topTracks,
        albumsPreview: albumsPreview, 
        singlesEpsPreview: singlesEpsPreview, 
        appearsOnPreview: appearsOnPreview,
    }

}

export async function getAllAlbums(artistId: string, currentOffSet: number): Promise<AlbumData>{

    const albums = await ArtistRepository.getAlbums(artistId, currentOffSet, 20, "album,single");
    const artist = await ArtistRepository.getArtist(artistId);

    return{
        albums: albums,
        artist: artist,
    }

}