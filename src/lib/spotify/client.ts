import { SPOTIFY_API, ERROR_MESSAGES } from "@/constants/spotify";

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

//Variables store the access token and its expiration time.
let cachedToken : string | null = null;
let tokenExpiration: number = 0;

//Verify the token
async function getAccessToken() : Promise<string> {
    
    //If there is already a valid token in the cache, return
    if(cachedToken && Date.now() < tokenExpiration){
        return cachedToken;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if(!clientId || !clientSecret){
        throw new Error ('Credenciais do Spotify não configuradas');
    }

    //Makes the authentication request
    try{

        const response = await fetch(SPOTIFY_API.AUTH_URL, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
            body: "grant_type=client_credentials",     
        });

        if(!response.ok){
            throw new Error(ERROR_MESSAGES.AUTH_FAILED);
        }

        const data: SpotifyAuthResponse = await response.json();
        cachedToken = data.access_token;
        tokenExpiration = Date.now() + 3600 * 1000;

        console.log(`Token obtido. Válido por ${data.expires_in}s`);

        return data.access_token;

    } catch (error) {
        console.error('Erro na autenticação: ', error);
        throw new Error(ERROR_MESSAGES.AUTH_FAILED);
    }
}

//Wrapper to make HTTP requests to the Spotify API
export async function spotifyFetch<T>( endpoint: string, options?: RequestInit ) : Promise<T> {

    const token = await getAccessToken();

    const url = `${SPOTIFY_API.BASE_URL}${endpoint}`;

    try{

        const response = await fetch(url, {
            ...options, //Spreads the other request options, such as method, credentials, etc.
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            next: {
                revalidate: 3600,
                tags: ['spotify-data']//Tag to invalidate
            }
        });

        if(!response.ok){
            if(response.status === 429){
                throw new Error(ERROR_MESSAGES.RATE_LIMIT);
            }
            if(response.status === 404){
                throw new Error(ERROR_MESSAGES.NOT_FOUND);
            }
            throw new Error(ERROR_MESSAGES.FETCH_FAILED);
        }

        return await response.json();

    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
         throw error; //Rethrowing the same error that was caught
    }

}

//Construct query parameters
export function buildQueryString(params: Record<string, string | number | undefined>){

    const filteredParams = Object.entries(params)//Converts the params object to an array of key-value pairs.
    .filter(([_, value]) => value !== undefined )//Remove undefined values
    .map(([key, value]) =>  `${key}=${encodeURIComponent(value!)}`)//.map is used to build a string of type key=value, but with the values ​​being encoded with encodeURIComponent
    .join('&');//.join('&') takes all the elements of an array and joins them into a single string, separating them with the & character

    return filteredParams ? `?${filteredParams}` :  '';

}
