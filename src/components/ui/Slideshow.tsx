import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chai from "@/assets/chai.png";

const images = [
    chai
];

const variants = {
    enter: (direction:number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        position: "absolute",
    }),
    center: {
        x: 0,
        opacity: 1,
        position: "relative",
    },
    exit: (direction:number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        position: "absolute",
    }),
};

export default function Slideshow() {
    const [[page, direction], setPage] = useState([0, 0]);

    useEffect(() => {
        const timer = setInterval(() => {
            setPage(([prevPage]) => [
                (prevPage + 1) % images.length,
                1,
            ]);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-[95vw] mx-auto my-4 h-64 sm:h-80 md:h-96 lg:h-130 overflow-hidden rounded-lg shadow-lg">
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={images[page]}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                    }}
                    className="w-full h-full object-cover "
                    alt={`Slide ${page + 1}`}
                />
            </AnimatePresence>
            <div className="absolute bottom-2  sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${page === idx ? "bg-white" : "bg-gray-400"} transition-colors`}
                        onClick={() => setPage([idx, idx > page ? 1 : -1])}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}