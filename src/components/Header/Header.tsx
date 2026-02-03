'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Search } from "../Search/Search";
import { BiMenu, BiX, BiHome, BiSearch  } from "react-icons/bi";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

interface Links{
    href: string,
    label: string,
    icon: React.ElementType,
};

export function Header(){

    const [isMenuMobileOpen, setIsMenuMobileOpen] = useState<boolean>(false);

    const Links: readonly Links[] = [
        {href:"/", label:"Início", icon: BiHome},
        {href:"/search", label:"Buscar", icon: BiSearch},
    ] as const;

    return(

        <header className="fixed top-0 left-0 right-0 z-50 bg-background">
            <nav className="relative header-container h-12 md:h-16 flex items-center justify-between">

                {/*Logo*/}
                <div className="relative h-10 w-28">
                    <Link href={"/"} aria-label="Ir para página inicial">
                        <Image
                            src={"/img/jmusic.png"}
                            alt={"Logo"}
                            fill
                            className="object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/*Desktop nav*/}
                <div className="hidden md:flex items-center gap-3">
                    <Search/>
                    <ThemeToggle/>
                </div>

                {/*Mobile nav*/}
                <div className="md:hidden flex items-center gap-3">
                    <ThemeToggle/>
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={()=>setIsMenuMobileOpen(!isMenuMobileOpen)}
                        className="p-2 rounded-xl"
                    >
                        {isMenuMobileOpen ? <BiX/> : <BiMenu/>}
                    </Button>
                </div>

            </nav>

            {/*Menu Mobile*/}
            {isMenuMobileOpen && (
                <div className="md:hidden bg-background fadeInDown overflow-hidden">
                    <div className="p-4 space-y-3">
                        {Links.map((link)=>(
                            <Link key={link.href} href={link.href} className="flex items-center gap-2" onClick={()=>setIsMenuMobileOpen(false)}>
                                <link.icon size={25} /><span className="font-semibold">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </header>

    )

}