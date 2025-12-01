export function useFormatTime(ms: number, formatTime: "track" | "album"){

    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000); 
    const seconds = Math.floor((ms % 60000) / 1000); 

    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    if(formatTime === "album"){
        if(hours > 0){
            return `${hours}h ${formatMinutes}min`;
        }
        else{
            return `${minutes}min ${formatSeconds}sec`;
        }
    } else {
        if(hours > 0){
            return `${hours}:${formatMinutes}`;
        }
        else{
            return `${minutes}:${formatSeconds}`;
        }
    }

}