'use client'

import { SpotifyArtist } from "@/src/types/spotify";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ArtistCard } from "../ArtistCard/ArtistCard";
import Link from "next/link";
import { Button } from "../Button/Button";

interface CarouselProps{
    title: string,
    artists: SpotifyArtist[],
    link: string,
};

export function Carousel({title, artists, link}: CarouselProps){

    const [itemsVisible, setItemsVisible] = useState(5);
    const [containerWidth, setContainerWidth] = useState(0);
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const carouselRef = useRef<HTMLDivElement>(null);
    const dragStartX = useRef(0);
    const dragStartTranslate = useRef(0);

    const maxIndex = useMemo(() => Math.max(0, artists.length - itemsVisible),[artists.length, itemsVisible]);
    const itemWidth = useMemo(() => Math.floor(containerWidth / itemsVisible), [containerWidth, itemsVisible]);
    const totalWidth = useMemo(() => artists.length * itemWidth, [artists.length, itemWidth]);
    const maxTranslate = useMemo(() => Math.max(0, totalWidth - containerWidth), [totalWidth, containerWidth]);

    const getItemsVisible = useCallback(() => {

        if (typeof window === "undefined") return 5; //SSR
        if (window.innerWidth >= 1536) return 5; 
        if (window.innerWidth >= 1024) return 4; 
        if (window.innerWidth >= 768) return 3; 

        return 2; 

    }, []); 

    const moveToIndex = useCallback((newIndex: number) => {
        setIndex(newIndex);
        const targetTranslateX = newIndex * itemWidth;
        setTranslateX(Math.min(targetTranslateX, maxTranslate));
    }, [itemWidth, maxTranslate]);

    const handlePrev = useCallback(() => {
        const nextIndex = Math.max(index - 1, 0);
        moveToIndex(nextIndex);
    }, [index, moveToIndex]);

    const handleNext = useCallback(() => {
        const nextIndex = Math.min(index + 1, maxIndex);
        moveToIndex(nextIndex);
    }, [index, maxIndex, moveToIndex]);

    useEffect(() => {

        const handleResize = () => {

            const visibleItems = getItemsVisible();
            setItemsVisible(visibleItems);

            if(visibleItems <= 3) setIsMobile(true);
            else setIsMobile(false);

            if(carouselRef.current){
                setContainerWidth(carouselRef.current.offsetWidth);

                    setIndex(prevIndex => {

                        const adjustedIndex = Math.min(prevIndex, maxIndex);
                        
                        if (!isMobile) { //If you are in desktop mode, recalculate translateX
                            const targetTranslateX = adjustedIndex * itemWidth;
                            setTranslateX(Math.min(targetTranslateX, maxTranslate));
                        } else {
                            // If in mobile (drag) mode, it only limits if you exceed the limit
                            setTranslateX(prev => Math.min(prev, maxTranslate));
                        }
                        
                        return adjustedIndex;

                });

            }

        };

        handleResize();

        window.addEventListener('resize', handleResize); //Adds an event listener to the window object to listen for the resize event
        return () => window.removeEventListener('resize', handleResize); //Returns a cleanup function that runs when the component is unmounted or when the useEffect dependencies change, and removes the resize event listener

    }, [getItemsVisible, maxTranslate, isMobile, itemWidth, maxIndex]);

    //Drag with mouse
    const handleMouseDown = useCallback ((e: React.MouseEvent) => {

        if(!isMobile) return;

        dragStartX.current = e.clientX; //Saves the initial mouse position
        dragStartTranslate.current = translateX; //Save the current value of the element, in this case the carousel element
        setIsDragging(true);
        e.preventDefault();

        const onMouseMove = (e: MouseEvent) => { //This function will be called whenever the mouse moves while the button is pressed

            const offSet = e.clientX - dragStartX.current; //The difference between the current mouse position (e.clientX) and the initial mouse position (dragStartX.current)
            const newTranslate = dragStartTranslate.current - offSet; //This moves the element as the mouse moves

            setTranslateX(Math.max(0, Math.min(maxTranslate, newTranslate)));

        };

        const onMouseUp = () => { //This function is called when the mouse button is released

            setIsDragging(false);

            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

        };
        
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

    }, [isMobile, translateX, maxTranslate])

    //Drag for mobile
    const handleTouchStart = useCallback ((e: React.TouchEvent) => {
        
        if (!isMobile) return;

        dragStartX.current = e.touches[0].clientX;
        dragStartTranslate.current = translateX;
        setIsDragging(true);

        const onTouchMove = (e: TouchEvent) => {

            const offset = e.touches[0].clientX - dragStartX.current;
            const newTranslate = dragStartTranslate.current - offset;
      
            setTranslateX(Math.max(0, Math.min(maxTranslate, newTranslate)));
        };

        const onTouchEnd = () => {

        setIsDragging(false);

        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);

        };

        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onTouchEnd);

    }, [isMobile, translateX, maxTranslate]);

    return(

        <section className="pt-5 pb-10" aria-label={title}>
            <div className="content-container flex items-end justify-between mb-3">
                <h4 className="text-xl md:text-2xl font-semibold">{title}</h4>
                <Link href={link} className="text-sm md:text-base hover:text-white hover:underline text-white/60"> Mostrar tudo</Link>
            </div>
            <div className="content-container relative overflow-x-hidden">
                <div 
                    className={`flex -ml-2 md:-ml-4 select-none
                        ${isMobile && isDragging ? 'cursor-grabbing' : ''}
                        ${isMobile && !isDragging ? 'cursor-grab' : ''}
                        ${!isMobile ? 'cursor-default' : ''}
                        ${isDragging ? '' : 'transition-transform duration-300 ease-out'} 
                    `}
                    ref={carouselRef}
                    style={{transform: `translateX(-${translateX}px)`}}
                    onMouseDown={isMobile ? handleMouseDown : undefined}
                    onTouchStart={isMobile ? handleTouchStart : undefined}
                >
                    {artists.map((artist) => (
                        <div key={artist.id} style={{ width: `${100 / itemsVisible}%` }} className="shrink-0">
                            <ArtistCard artist={artist} />
                        </div>
                    ))}
                </div>
                { !isMobile &&  (
                    <>
                        <Button
                            variant="ghost"
                            size="lg"
                            aria-label="Anterior"
                            className={`group absolute inset-y-0 left-0 min-w-10 md:min-w-14.5 rounded-r-xl transition-opacity duration-500
                                    ${index === 0 ? "opacity-0" : "cursor-pointer"}
                            `}
                            onClick={handlePrev}
                            disabled={index === 0}
                        >
                            <MdOutlineKeyboardArrowLeft size={50} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                            aria-label="Próximo"
                            className={`group absolute inset-y-0 right-0 min-w-10 md:min-w-14.5 rounded-l-xl transition-opacity duration-500
                                    ${index === maxIndex ? "opacity-0" : "cursor-pointer"}
                            `}
                            onClick={handleNext}
                            disabled={index === maxIndex}
                        >
                            <MdOutlineKeyboardArrowRight size={50} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                        </Button>
                    </>
                )} 
            </div>    
        </section>

    )

}