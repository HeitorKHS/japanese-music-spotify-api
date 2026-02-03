'use client'

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Search } from "../Search/Search";

export function SearchHeader(){

    const searchParams= useSearchParams();
    const q = searchParams.get("q") || "";
    const pathname = usePathname();

    const links = [
        {href: `/search?q=${q}`, label: "Tudo", path: "/search"},
        { href: `/search/artists?q=${q}`, label: "Artistas", path: "/search/artists" },
        { href: `/search/albums?q=${q}`, label: "Álbuns", path: "/search/albums" },
        { href: `/search/tracks?q=${q}`, label: "Músicas", path: "/search/tracks" },
    ];

    return(

        <header className="fixed left-0 right-0 bg-background z-20">

            <nav className="relative header-container py-4 flex items-center justify-center flex-col">

                {/*Menu*/}
                <div className="space-x-5">
                    {links.map((link)=>{

                        const isAction = pathname === link.path;

                        return(
                            <Link key={link.href} href={link.href} className={`rounded-full text-sm md:text-base py-1 px-4 
                                ${isAction ? "bg-foreground text-background" : "dark:bg-neutral-700/70 text-foreground border dark:hover:bg-neutral-600"}`}
                            >
                                {link.label}
                            </Link>
                        )

                    })}
                </div>
                
                {/*Search*/}
                <div className="md:hidden mt-4 flex justify-center">
                    <Search/>
                </div>

            </nav>

        </header>

    )

}