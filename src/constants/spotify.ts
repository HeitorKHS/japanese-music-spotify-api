// Genres related to Japanese music
export const JAPANESE_GENRES = [
  'j-pop',
  'j-rock',
  'j-idol',
  'j-dance',
  'rap japonês',
  'anime',
  'japanese r&b',
  'shibuya-kei',
  'vocaloid',
  'enka',
  'city pop',
  'anime',
] as const;

// Markets (countries) - JP for Japan
export const SPOTIFY_MARKET = 'JP';

// Playlist Tokyo Super Hits
export const TOKYO_SUPER_HITS_ID = '0KgrxJF5QFmJViO5TJEfLr';
export const JAPANESE_WOMEN_ID = '11WH19OqPnO6LAYKGJKYlJ';

// Pagination settings
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  SEARCH_LIMIT: 5,
  HOME_FEATURED_ARTISTS_WEEK: 5,
  HOME_FEATURED_TRACKS_WEEK: 5,
} as const;

// Sorting available
export const GENRE_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'j-pop', label: 'J-Pop' },
  { value: 'j-rock', label: 'J-Rock' },
  { value: 'j-idol', label: 'J-Idol' },
  { value: 'j-dance', label: 'J-Dance' },
  { value: 'anime', label: 'Anime' },
  { value: 'japanese r&b', label: 'Japanese R&B' },
  { value: 'shibuya-kei', label: 'Shibuya-kei' },
  { value: 'vocaloid', label: 'Vocaloid' },
  { value: 'enka', label: 'Enka' },
  { value: 'city pop', label: 'City Pop' },
  {value: 'rap japonês', label: 'Rap Japonês'},
] as const;

// Spotify API URLs
export const SPOTIFY_API = {
  BASE_URL: 'https://api.spotify.com/v1',
  AUTH_URL: 'https://accounts.spotify.com/api/token',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  AUTH_FAILED: 'Falha na autenticação com Spotify',
  FETCH_FAILED: 'Erro ao buscar dados do Spotify',
  NOT_FOUND: 'Conteúdo não encontrado',
  RATE_LIMIT: 'Muitas requisições. Tente novamente em alguns segundos.',
} as const;

// Type helper for genders
export type JapaneseGenre = typeof JAPANESE_GENRES[number];
export type GenreFilterValue = typeof GENRE_FILTERS[number]['value'];