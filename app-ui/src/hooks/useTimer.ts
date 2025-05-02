import { useEffect, useRef, useState } from "react";

export default function useTimer(duration: number = 10) {
    const [timer, setTimer] = useState<number>(0);
    const [runner, setRunner] = useState<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isWindowFocused = useRef<boolean>(true);

    const startInterval = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setRunner((prev) => prev + 1);
            }, 1000);
        }
    };

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        // Start interval initially
        startInterval();

        const handleBlur = () => {
            isWindowFocused.current = false;
            stopInterval();
        };

        const handleFocus = () => {
            isWindowFocused.current = true;
            startInterval();
        };

        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);

        return () => {
            stopInterval();
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    useEffect(() => {
        if (runner > 0 && runner % duration === 0) {
            setTimer((prev) => prev + 1);
        }
    }, [runner, duration]);

    return {timer, setTimer, setRunner};
};