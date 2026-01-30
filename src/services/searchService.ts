import { SearchRepository } from "../repositories/searchRepository";
import { SpotifyArtist, SpotifyAlbum, SpotifyTrack } from "../types/spotify";
import { JAPANESE_GENRES } from "../constants/spotify";

interface SearchData{
    artists: SpotifyArtist[],
    albums: SpotifyAlbum[],
    tracks: SpotifyTrack[],
};

function filterJapaneseArtists(artists: SpotifyArtist[]): SpotifyArtist[]{

    return artists.filter(({genres = []}) =>
        //Checks if 'any' of the artist's genres corresponds to 'any' of the Japanese genres
        genres.some(genre =>
            JAPANESE_GENRES.some(jpGenre =>
                genre.toLowerCase().includes(jpGenre.toLowerCase())
            )
        )
    );

}

function filterAlbums(albums: SpotifyAlbum[], artistsId: Set<string>){
    return albums.filter(album => album.artists.some(artist => artistsId.has(artist.id)));
}

function filterTracks(tracks: SpotifyTrack[], artistsId: Set<string>){
    return tracks.filter(track => track.artists.some(artist => artistsId.has(artist.id)));
}

export async function getSearch(q: string): Promise<SearchData>{

    const response = await SearchRepository.getSearch(q);

    const filteredArtists = filterJapaneseArtists(response.artists);

    const artistsId = new Set(filteredArtists.map(artist => artist.id));

    const filteredAlbums = filterAlbums(response.albums, artistsId);

    const filteredTracks = filterTracks(response.tracks, artistsId);

    return{
        artists: filteredArtists,
        albums: filteredAlbums,
        tracks: filteredTracks,
    };

}