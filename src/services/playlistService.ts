import { SpotifyArtist, SpotifyTrack, SpotifyImage } from "../types/spotify";
import { PlaylistRepository } from "../repositories/playlistRepository";
import { ArtistRepository } from "../repositories/artistRepository";
import { SPOTIFY_PLAYLISTS } from "../constants/spotify";

interface PlaylistData{
    artists: SpotifyArtist[], 
    href: string,
}

interface HomeData{
    tokyoArtists: PlaylistData,
    indieArtists: PlaylistData,
    womenArtists: PlaylistData,
    rapArtists: PlaylistData,
    rockArtists: PlaylistData,
}

interface ArtistsPlaylist{
    artistsPlaylist: {
        name: string,
        images: SpotifyImage[],
        artists: SpotifyArtist[],
    },
};

//Extracts unique artists from a playlist
async function filterArtist(tracks: SpotifyTrack[], limit: number){

    const uniqueArtistIds = new Set<string>();

    for(const track of tracks){

        if(uniqueArtistIds.size >= limit) break;

        const mainArtist = track.artists[0];//If there is more than one artist, he will pick the first one, who should be the main one.

        if(mainArtist && !uniqueArtistIds.has(mainArtist.id)){
            uniqueArtistIds.add(mainArtist.id);
        }
        
    }

    const artistIds = Array.from(uniqueArtistIds); 

    if (artistIds.length === 0) return [];

    return await ArtistRepository.getSeveralArtists(artistIds);

}

////Private helper function to isolate the request error
async function getSafePlaylistData(id: string): Promise<PlaylistData> {

    try {
        const playlist = await PlaylistRepository.getPlaylist(id);
        const artists = await filterArtist(playlist.tracks.items.map(item => item.track), 10);
        return { artists, href: id };
    } catch (error) {
        console.error(`[Spotify Service] Falha ao carregar playlist ${id}:`, error);
        return { artists: [], href: id };
    }

}

export async function getHomeData(): Promise<HomeData>{

    const [tokyo, indie, women, rap, rock] = await Promise.all([
        getSafePlaylistData(SPOTIFY_PLAYLISTS.TOKYO_SUPER_HITS),
        getSafePlaylistData(SPOTIFY_PLAYLISTS.INDIE_JAPAN),
        getSafePlaylistData(SPOTIFY_PLAYLISTS.JAPANESE_WOMEN),
        getSafePlaylistData(SPOTIFY_PLAYLISTS.RAP_JAPAN),
        getSafePlaylistData(SPOTIFY_PLAYLISTS.ROCK_JAPAN),
    ]);

    return{
        tokyoArtists: tokyo, 
        indieArtists: indie, 
        womenArtists: women,
        rapArtists: rap,
        rockArtists: rock,
    };

}

export async function getArtistsPlaylist(playlistId: string): Promise<ArtistsPlaylist>{

    const response = await PlaylistRepository.getPlaylist(playlistId);

    const artists = await filterArtist(response.tracks.items.map(item => item.track), 50);

    return{
        artistsPlaylist:{
            name: response.name,
            images: response.images,
            artists: artists,
        },
    };

}