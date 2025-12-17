//Genres related to Japanese music
export const JAPANESE_GENRES = [
    "j-pop",
    "j-rock",
    "j-idol",
    "j-dance",
    "rap japonês",
    "anime",
    "japanese r&b",
    "shibuya-kei",
    "vocaloid",
    "enka",
    "city pop",
    "anime",
] as const; //

//Markets (countries)
export const SPOTIFY_MARKET = "PT";

//Playslist
export const SPOTIFY_PLAYLISTS = {
  TOKYO_SUPER_HITS: "0KgrxJF5QFmJViO5TJEfLr",
  JAPANESE_WOMEN: "11WH19OqPnO6LAYKGJKYlJ",
  ROCK_JAPAN: "59sn8iwLmvqjO83uT4w29S",
  RAP_JAPAN: "61tMffmfWF4ejTy2UioY5D",
  INDIE_JAPAN: "1zr44X4dTtCQ6thRYiQTej",
 } as const;

//Spotify API URLs
export const SPOTIFY_API = {
    BASE_URL: "https://api.spotify.com/v1",
    AUTH_URL: "https://accounts.spotify.com/api/token",
} as const;

// Error messages
export const ERROR_MESSAGES = {
    AUTH_FAILED: "Falha na autenticação com Spotify",
    FETCH_FAILED: "Erro ao buscar dados do Spotify",
    NOT_FOUND: "Conteúdo não encontrado",
    RATE_LIMIT: "Muitas requisições. Tente novamente em alguns segundos.",
} as const;
