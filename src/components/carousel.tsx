'use client'
import { useEffect, useState } from "react";

export default function Carousel() {
    const slides = [
        {
            title: "Sustainable packaging",
            description: "Eco-friendly recyclable paper packaging."
        },
        {
            title: "Secure payments",
            description: "Reliable and secure online purchases."
        },
        {
            title: "Vegan",
            description: "High quality soy wax scented candles."
        },
        {
            title: "Hand-poured",
            description: "Premium scented candles meticulously made in Morocco"
        }
    ];

    const LeftArrow = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.0039 8.00195L10.0039 12.002L14.0039 16.002" stroke="#5B5250" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const RightArrow = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99609 15.998L13.9961 11.998L9.99609 7.99805" stroke="#5B5250" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);


    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    const changeSlide = (newIndex: number) => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrent(newIndex);
        }
    };

    const previousSlide = () => {
        const newIndex = current === 0 ? slides.length - 1 : current - 1;
        changeSlide(newIndex);
    };

    const nextSlide = () => {
        const newIndex = current === slides.length - 1 ? 0 : current + 1;
        changeSlide(newIndex);
    };

    return (
        <div className="overflow-hidden relative">
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 lg:px-20 text-center py-4">
                        <h2 className="font-spectral text-center text-xl">{slide.title}</h2>
                        <p className="mt-3 px-[4.2rem] font-karla leading-7 text-foreground/70 font-light">
                            {slide.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-6 text-3xl">
                <button onClick={previousSlide} disabled={isTransitioning}>
                    <LeftArrow />
                </button>
                <button onClick={nextSlide} disabled={isTransitioning}>
                    <RightArrow />
                </button>
            </div>
        </div>
    );
}