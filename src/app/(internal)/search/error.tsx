'use client'

import { useEffect } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Error({error, reset,}: {error: Error & {digest?: string}; reset: ()=> void}){

    useEffect(()=>{
        console.error(error);
    }, [error]);

    return(
        <div className="min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)] flex justify-center flex-col">
            <div className="content-container">   
                <AiOutlineExclamationCircle size={40} className="mx-auto"/>
                <h2 className="text-xl md:text-3xl font-bold text-center mt-5">Algo deu errado ao pesquisar.</h2>
                <p className="text-neutral-400 mt-5 text-center">{error.message}</p>
            </div>
        </div>
    )

}