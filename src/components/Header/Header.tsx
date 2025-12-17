import Link from "next/link";
import Image from "next/image";

export function Header(){

    return(
        
        <header className="fixed top-0 left-0 right-0 z-50 bg-black h-16">
            <div className="header-container py-3 flex items-center justify-start">

                {/*Logo*/}
                <div className="h-10">
                    <Link href={"/"} aria-label="Ir para página inicial">
                        <Image
                            src={"/img/jmusic.png"}
                            alt={"Logo"}
                            width={849}
                            height={285}
                            className="h-full w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>
            </div>
        </header>

    )

}