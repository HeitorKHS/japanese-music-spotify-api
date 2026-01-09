'use client'

import Link from "next/link";
import Image from "next/image";
import { Search } from "../Search/Search";
import { Button } from "../Button/Button";
import { BiSun, BiMoon, BiMenu, BiX, BiHome, BiSearch  } from "react-icons/bi";
import { useState } from "react";


interface Links{
    href: string,
    label: string,
    icon: React.ElementType,
};

export function Header(){

    const [isDark, setIsDark] = useState<boolean>(false);
    const [isMenuMobileOpen, setIsMenuMobileOpen] = useState<boolean>(false);

    const Links: readonly Links[] = [
        {href:"/", label:"Início", icon: BiHome},
        {href:"/search", label:"Buscar", icon: BiSearch},
    ] as const;

    return(
        
        <header className="fixed top-0 left-0 right-0 z-50 bg-black h-16">
            <nav className="relative header-container py-3 flex items-center justify-between">

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

                {/*Nav desktop*/}
                <div className="hidden md:flex gap-5">
                    <Search/>
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={()=>setIsDark(!isDark)}
                        className="p-2 hover:bg-neutral-800/60 rounded-xl"
                    >
                        {isDark ? <BiMoon/> : <BiSun/>}
                    </Button>
                </div>

                {/*Nav Mobile*/}
                <div className="md:hidden flex gap-2">
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={()=>setIsDark(!isDark)}
                        className="p-2 hover:bg-neutral-800/60 rounded-xl"
                    >
                        {isDark ? <BiMoon/> : <BiSun/>}
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={()=>setIsMenuMobileOpen(!isMenuMobileOpen)}
                        className="p-2 hover:bg-neutral-800/60 rounded-xl"
                    >
                        {isMenuMobileOpen ? <BiX/> : <BiMenu/>}
                    </Button>
                </div>

            </nav>

            {isMenuMobileOpen && (
                <div className="md:hidden bg-black fadeInDown overflow-hidden">
                    <div className="px-4 py-4 space-y-3">
                        {Links.map((link)=>(
                            <Link key={link.href} href={link.href} className="flex items-center gap-2" onClick={()=>setIsMenuMobileOpen(false)}>
                                <link.icon size={25} /><span className=" font-semibold">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </header>

    )

}