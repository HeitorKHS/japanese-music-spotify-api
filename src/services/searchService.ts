import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "../types/spotify";
import { getSearchAll } from "../repositories/searchService";
import { JAPANESE_GENRES } from "../constants/spotify";

interface SearchData{
    artists: SpotifyArtist[],
    albums: SpotifyAlbum[],
    tracks: SpotifyTrack[],
};

function filterJapaneseArtists(artists: SpotifyArtist[]): SpotifyArtist[]{

    return artists.filter(artist =>
        //Ensure that 'artist.genres' exists and has items. If not, return 'false' immediately
        artist.genres && artist.genres.length > 0 &&
        //Checks if 'any' of the artist's genres corresponds to 'any' of the Japanese genres
        artist.genres.some(genre =>
            JAPANESE_GENRES.some(jpGenre =>
                genre.toLowerCase().includes(jpGenre.toLowerCase())
            )
        )
    );

}

function filterAlbums(albums: SpotifyAlbum[], artistsId: string[]){
    return albums.filter(album => album.artists.some(artist => artistsId.includes(artist.id)));
}

function filterTracks(tracks: SpotifyTrack[], artistsId: string[]){
    return tracks.filter(track => track.artists.some(artist => artistsId.includes(artist.id)));
}

export async function getSearchData(search: string): Promise<SearchData>{

    try{

        const response = await getSearchAll(search);

        const filterArtists = filterJapaneseArtists(response.artists);

        const filterIds = filterArtists.map(artist => artist.id);

        const filterAlbum = filterAlbums(response.albums, filterIds);

        const filterTrack = filterTracks(response.tracks, filterIds);

        return{
            artists: filterArtists,
            albums: filterAlbum,
            tracks: filterTrack,
        };

    } catch(error){
        console.error('Erro ao buscar dados da pesquisa:', error);
        return{
            artists: [],
            albums: [],
            tracks: [],
        }
    }

}