import { SlMusicTone, SlMusicToneAlt } from "react-icons/sl"

export function Hero(){
 
    return(

        <section className="relative min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)] flex justify-center items-center overflow-hidden">
            
            {/*Animated Background*/}
            <div className="absolute inset-0">
                <div className="absolute top-1/6 left-1/4 w-110 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse animate-infinite"/>
                <div className="absolute top-1/4 right-1/4 w-100 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse animate-infinite"/>
                <div className="absolute top-2/4 right-2/5 w-80 h-64 bg-pink-600/15 rounded-full blur-3xl animate-pulse animate-infinite"/>
            </div>

            {/*Animated Icon*/}
            <div className="absolute inset-0">
                <div className="absolute top-1/8 left-1/6 animate-float">
                    <SlMusicTone className="text-5xl md:text-8xl text-pink-500/20"/>
                </div>
                <div className="absolute top-2/5 left-1/3 animate-float">
                    <SlMusicToneAlt className="text-5xl md:text-8xl text-pink-500/20"/>
                </div>
                <div className="absolute top-1/5 left-5/6 animate-float">
                    <SlMusicTone className="text-5xl md:text-8xl text-pink-500/20"/>
                </div>
                <div className="absolute top-3/5 left-1/10 animate-float">
                    <SlMusicToneAlt className="text-5xl md:text-8xl text-pink-500/20"/>
                </div>
                <div className="absolute top-3/6 left-4/7 animate-float">
                    <SlMusicTone className="text-5xl md:text-8xl text-pink-500/20"/>
                </div>
                <div className="absolute top-4/6 left-5/7 animate-float">
                    <SlMusicToneAlt className="text-5xl md:text-8xl text-pink-500/20"/>
                </div>
            </div>

            {/*Content*/}
            <div className="text-center max-w-5xl z-10">
                <h1 className="mb-10 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                    <span>Explore o </span>
                    <span className="bg-linear-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Universo Musical do Japão</span>
                </h1>
                <span className="mb-10 text-lg md:text-xl text-subtext">Explore artistas, álbuns e músicas do Japão. Encontre tudo sobre seus artistas favoritos.</span>
            </div>

        </section>

    )

}