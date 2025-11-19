'use client'

import { Menu } from "./components/Menu";
import { Search } from "./components/Search";
import { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "../Button/Button";

interface HeaderProps{
    transparent?: boolean;
}

export function Header({ transparent }: HeaderProps){

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        
        //The function that detects the scroll
        const handleScroll = () : void => {
            setIsScrolled(window.scrollY > 0);
        };

        //addEventListener - Listens to the scroll event
        window.addEventListener('scroll', handleScroll, {passive: true});
        //When the component leaves the screen (unmount), remove the listener
        return () => window.removeEventListener('scroll', handleScroll);

    }, [])

    //Prevents the page from scrolling with the menu open
    useEffect(() => {

        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';

        return () => {
            document.body.style.overflow = 'unset';
        }

    }, [isMenuOpen]);

    return(

        <header 
            className={`${transparent ? `fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out bg-gradient-to-b from-[var(--color-background)] to-transparent ${isScrolled ? 'bg-[var(--color-background)]' : ''}`
                : 'bg-[var(--color-background)]' 
            }`}>
            <div className="custom-container py-3 flex items-center justify-between">
                {/*Logo*/}
                <div className="h-[35px] md:h-[40px]">
                    <Link href={"/"} aria-label = "Ir para página inicial">
                        <Image
                            src="/img/jmusic.png"
                            alt="J-music Logo"
                            width={849}
                            height={285}
                            className="h-full w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                <div className="hidden md:flex items-center justify-between gap-10">
                    <Search/>
                    <Menu/>
                </div>

                {/*Button mobile*/}
                <div className="md:hidden">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Abrir menu"
                        aria-expanded={isMenuOpen}
                        onClick={()=> setIsMenuOpen(true)} 
                    >
                        <FaBars/>
                    </Button>
                </div>

                {isMenuOpen && (
                    <>
                        {/*Backdrop*/}
                        <div
                            className="md:hidden fixed inset-0 bg-black/50 z-30 animate-fadeIn"
                            onClick={() => setIsMenuOpen(false)}
                            aria-hidden="true"
                        />
                        <div className="md:hidden custom-container fixed inset-0 bg-[var(--color-background)] z-40 animate-slideIn">
                            <div className="flex justify-end py-6">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Fechar menu"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaTimes size={20} />
                                </Button>
                            </div>
                            <Search/>
                            <Menu setMenuOpen={setIsMenuOpen} isMobile/>
                        </div>
                    </>
                )}
            </div>
        </header>  

    )

}