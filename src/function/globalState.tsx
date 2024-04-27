"use client";

import { useState, useEffect } from "react"

export const CheckMode = () => {
    const [mode, setMode] = useState<boolean>(false); // State for managing mode (not clear what mode represents)
    const [modeCheck, setModeCheck] = useState<boolean>(false);

    useEffect(() => {
        const sessionTheme = sessionStorage.getItem('theme');
        if (sessionTheme == 'dark') {
            setMode(true)
        } else if (sessionTheme === null) {
            if (!modeCheck) {
                const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                sessionStorage.setItem('theme', !isDarkMode ? 'light' : 'dark');
                setModeCheck((true))
            }
        } else {
            setMode(false)
        }
    }, [setMode, setModeCheck, modeCheck])

    useEffect(() => {
        if (mode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    });

    return { mode, setMode }
}
