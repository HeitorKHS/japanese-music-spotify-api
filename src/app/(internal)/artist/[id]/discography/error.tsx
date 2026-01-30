'use client'

import { useEffect } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Error({error, reset,}: {error: Error & {digest?: string}; reset: ()=> void}){

    useEffect(()=>{
        console.error(error);
    }, [error]);

    return(
        <div className="min-h-screen flex items-center justify-center flex-col">
            <AiOutlineExclamationCircle size={40}/>
            <h2 className="text-xl md:text-3xl font-bold text-center mt-5">Algo deu errado ao carregar a discografia do artista.</h2>
            <p className="text-neutral-400 mt-5">{error.message}</p>
        </div>
    )

}