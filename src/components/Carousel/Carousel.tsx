'use client'

import { Button } from "../Button/Button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

interface CarouselProps<T>{
    items: T[],
    title: string,
    ItemComponent: React.ComponentType<{item: T}>,
    keyExtractor: (item: T) => string,
}

export function Carousel<T>({items, title, ItemComponent, keyExtractor}: CarouselProps<T>){

    const [itemsVisible, setItemsVisible] = useState(5);
    const [containerWidth, setContainerWidth] = useState(0);
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const carouselRef= useRef<HTMLDivElement>(null);
    const dragStartX = useRef(0);
    const dragStartTranslate = useRef(0);

    const maxIndex = useMemo(() => Math.max(0, items.length - itemsVisible),[items.length, itemsVisible]);
    const itemWidth = useMemo(() => containerWidth / itemsVisible, [containerWidth, itemsVisible]);
    const totalWidth = useMemo(() => items.length * itemWidth, [items.length, itemWidth]);
    const maxTranslate = useMemo(() => Math.max(0, totalWidth - containerWidth), [totalWidth, containerWidth]);

    const getItemsVisible = useCallback (() => {
     
        if (typeof window === 'undefined') return 5; //SSR
        if (window.innerWidth >= 1536) return 5; 
        if (window.innerWidth >= 1024) return 4; 
        if (window.innerWidth >= 768) return 3; 

        return 2; 

    }, []);

    const handlePrev = useCallback (() => {
        setIndex((prev) => Math.max(prev - 1, 0));
    },[]);

    const handleNext = useCallback (() => {
        setIndex((prev) => Math.min(prev + 1, maxIndex));
    },[maxIndex])

    useEffect(() => {

        const handleResize = () => {

            const visibleItems = getItemsVisible();
            setItemsVisible(visibleItems);

            if(visibleItems <= 3) setIsMobile(true);
            else setIsMobile(false);

            if(carouselRef.current){
                setContainerWidth(carouselRef.current.offsetWidth);
            }

        };

        handleResize();

        window.addEventListener('resize', handleResize); //Adds an event listener to the window object to listen for the resize event
        return () => window.removeEventListener('resize', handleResize); //Returns a cleanup function that runs when the component is unmounted or when the useEffect dependencies change, and removes the resize event listener

    }, [getItemsVisible]);

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

    useEffect(() => {
        const targetTranslateX = index * itemWidth;
        setTranslateX(Math.min(targetTranslateX, Math.max(0, totalWidth - containerWidth)));
    }, [index, itemWidth, totalWidth, containerWidth]);

    return(

        <div className="relative pt-5 pb-10" aria-label={title}>
            <div className="content-container mb-3">
                <h4 className="text-2xl font-semibold">{title}</h4>
            </div>
            <div 
                className="content-container overflow-x-hidden"
            >
                <div 
                    className={`flex -ml-4 select-none
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
                    {items.map((item) => (
                        <div key={keyExtractor(item)} style={{ width: `${100 / itemsVisible}%` }} className="flex-shrink-0">
                            <ItemComponent item={item}/>
                        </div>
                    ))}
                </div>
            </div>

            { !isMobile && (
                <>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Anterior"
                        className={`absolute inset-y-0 left-0 inline-flex justify-center items-center w-[40px] md:w-[58px] group transition-opacity duration-300 ${index === 0 ? 'opacity-0 pointer-events-none' : 'cursor-pointer hover:bg-transparent'}`}
                        onClick={handlePrev}
                        disabled={index === 0}
                    >
                        <MdOutlineKeyboardArrowLeft size={50} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    </Button>

                    <Button 
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Próximo"
                        className={`absolute inset-y-0 right-0 inline-flex justify-center items-center w-[40px] md:w-[58px] group transition-opacity duration-300 ${index === maxIndex ? 'opacity-0 pointer-events-none' : 'cursor-pointer hover:bg-transparent'}`}
                        onClick={handleNext}
                        disabled={index === maxIndex}
                    >
                        <MdOutlineKeyboardArrowRight size={50} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    </Button>
                </>
            )} 
            
        </div>

    )

}