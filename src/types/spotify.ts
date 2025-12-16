export interface SpotifyImage{
    url: string,
    height: number,
    width: number,
};

export interface SpotifyExternalUrls{
    spotify: string,
};

export interface SpotifyFollowers{
    href: string | null,
    total: number,
};

export interface SpotifyArtist{
    id: string,
    name: string,
    type: "artist",
    uri: string,
    href: string,
    external_urls: SpotifyExternalUrls,
    images?: SpotifyImage[],
    genres?: string[],
    popularity?: number,
    followers?: SpotifyFollowers,
};

export interface SpotifyTrack{
    id: string,
    name: string,
    type: "track",
    uri: string,
    href: string,
    external_urls: SpotifyExternalUrls,
    duration_ms: number,
    explicit: boolean,
    preview_url: string | null,
    popularity: number,
    track_number: number,
    artists: SpotifyArtist[],
    album: SpotifyAlbum,
};

export interface SpotifyAlbum{
    id: string,
    name: string,
    type: "album",
    uri: string,
    href: string,
    external_urls: SpotifyExternalUrls,
    images: SpotifyImage[],
    release_date: string,
    release_date_precision: "year" | "month" | "day",
    total_tracks: number,
    artists: SpotifyArtist[],
    album_type: "album" | "single" | "compilation",
    genres?: string[],
    tracks: {
        items: SpotifyTrack[],
    },
};

export interface SpotifyPagination<T>{
    href: string,
    items: T[],
    limit: number,
    next: string | null,
    offset: number,
    previous: string | null,
    total: number,
};