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

    const [index, setIndex] = useState(0);
    const [itemsVisible, setItemsVisible] = useState(6); 
    const [isArrow, setIsArrow] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const carouselRef = useRef<HTMLDivElement>(null);
    const dragStartX = useRef(0);
    const dragStartTranslate = useRef(0);

    const maxIndex = useMemo(() => Math.max(0, artists.length - itemsVisible),[artists.length, itemsVisible]);
    
    const itemWidth = useMemo(() => {
        const totalGapsWidth = (itemsVisible - 1) * 16; 
        return (containerWidth - totalGapsWidth) / itemsVisible;
    }, [containerWidth, itemsVisible]);

    const totalWidth = useMemo(() => {
        const totalItemsSize = artists.length * itemWidth;
        const totalGapsSize = (artists.length - 1) * 16;
        return totalItemsSize + totalGapsSize;
    }, [artists.length, itemWidth]);

    const maxTranslate = useMemo(() => Math.max(0, totalWidth - containerWidth), [totalWidth, containerWidth]);

    const getItemsVisible = useCallback(() => {

        if (typeof window === "undefined") return 6;
        if (window.innerWidth >= 1400) return 6;  
        if (window.innerWidth >= 1000) return 5;  
        if (window.innerWidth >= 800) return 4;  
        if (window.innerWidth >= 500) return 3;  
        return 2;  

    }, []); 

    useEffect(() => {

        const handleResize = () => {

            const visibleItems = getItemsVisible();
            setItemsVisible(visibleItems);

            setIsArrow(visibleItems <= 4);

            if(carouselRef.current){
                setContainerWidth(carouselRef.current.offsetWidth);

                    setIndex(prevIndex => {

                        const adjustedIndex = Math.min(prevIndex, maxIndex);
                        
                        if (!isArrow) { //If you are in desktop mode, recalculate translateX
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

    }, [getItemsVisible, maxTranslate, isArrow, itemWidth, maxIndex]);

    const moveToIndex = useCallback((newIndex: number) => {
        setIndex(newIndex);
        const targetTranslateX = newIndex * (itemWidth + 16);
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

    //Drag with mouse
    const handleMouseDown = useCallback ((e: React.MouseEvent) => {

        dragStartX.current = e.clientX; //Saves the initial mouse position
        dragStartTranslate.current = translateX; //Save the current value of the element, in this case the carousel element
        setIsDragging(true);
        e.stopPropagation();
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

    }, [translateX, maxTranslate])

    //Drag for mobile
    const handleTouchStart = useCallback ((e: React.TouchEvent) => {

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

    }, [translateX, maxTranslate]);

    return(

        <>
            {artists.length > 0 && (           
                <section className="pt-10" aria-label={title}>
                    <div className="content-container flex items-end justify-between">
                        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
                        {artists.length > 0 && (
                            <Link href={link} className="text-sm md:text-base hover:text-foreground hover:underline text-subtext"> Mostrar tudo</Link>
                        )}
                    </div>
                    <div className="mt-2">
                        <div className="content-container relative overflow-x-hidden">
                            <div className={`flex gap-4 select-none
                                ${isDragging ? '' : 'transition-transform duration-300 ease-out'} `}
                                style={{transform: `translateX(-${translateX}px)`}}
                                ref={carouselRef}
                                onMouseDown={isArrow ? handleMouseDown : undefined}
                                onTouchStart={isArrow ? handleTouchStart : undefined}
                            >
                                {artists.map((artist) => (
                                    <div key={artist.id} className="shrink-0"
                                        style={{ width: `calc((100% - (${itemsVisible-1} * 16px)) / ${itemsVisible})` }}
                                    >
                                        <ArtistCard artist={artist}/>
                                    </div>
                                ))}
                            </div>
                            {!isArrow && (<>
                                <Button
                                    variant="ghost"
                                    aria-label="Anterior"
                                    className={`group absolute inset-y-0 left-0 min-w-26 rounded-r-xl transition-opacity duration-300 
                                        ${index === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                                    onClick={handlePrev}
                                    disabled={index === 0}
                                >
                                    <MdOutlineKeyboardArrowLeft size={40} className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300"/>
                                </Button>
                                <Button
                                    variant="ghost"
                                    aria-label="Próximo"
                                    className={`group absolute inset-y-0 right-0 min-w-26 rounded-l-xl transition-opacity duration-300 opacity-100
                                        ${index === maxIndex ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                                    onClick={handleNext}
                                    disabled={index === maxIndex}
                                >
                                    <MdOutlineKeyboardArrowRight size={40} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                </Button>
                            </>)}
                        </div>
                    </div>
                </section>
            )}
        </>
    )

}