import { spotifyFetch, buildQueryString } from "@/src/lib/spotify/client"; 
import { SPOTIFY_MARKET } from "@/src/constants/spotify";

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyFollowers {
  href: string | null;
  total: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  type: 'artist';
  uri: string;
  href: string;
  external_urls: SpotifyExternalUrls;
  images?: SpotifyImage[];
  genres?: string[];
  popularity?: number;
  followers?: SpotifyFollowers;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  type: 'track';
  uri: string;
  href: string;
  external_urls: SpotifyExternalUrls;
  duration_ms: number;
  explicit: boolean;
  preview_url: string | null;
  popularity: number;
  track_number: number;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  type: 'album';
  uri: string;
  href: string;
  external_urls: SpotifyExternalUrls;
  images: SpotifyImage[];
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  total_tracks: number;
  artists: SpotifyArtist[];
  album_type: 'album' | 'single' | 'compilation';
  genres?: string[];
  tracks: {
    items: SpotifyTrack[];
  };
}

export interface SpotifyPagination<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

async function SpotifyTestPage() {

    let response;

  try {

    const query = buildQueryString({
        market: SPOTIFY_MARKET,
        include_groups: "album",
        limit: 5,
    });

    response = await spotifyFetch<SpotifyPagination<SpotifyAlbum>>(
        `/artists/5kVZa4lFUmAQlBogl1fkd6/albums${query}`
    );

  } catch (error) {
    console.error("ERRO COMPLETO NA API SPOTIFY:", error);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50">
      {response?.items.map((item)=>(
        <p className="text-black" key={item.id}>{item.id}</p>
      ))}

    </div>
  );
}

export default SpotifyTestPage;