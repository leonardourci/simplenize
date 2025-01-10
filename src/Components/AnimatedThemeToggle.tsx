'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

// Main component for toggling dark/light mode
export default function AnimatedThemeToggle() {
    // State to track dark mode status
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggles the dark mode state and updates the local storage and document class
    const toggleThemeMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        updateLocalStorage(newMode);
        document.documentElement.classList.toggle('dark', newMode);
    };

    // Effect to initialize the theme from local storage or system preference
    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');

        if (storedDarkMode !== null) {
            // If there's a stored preference, use it
            const userPreference = JSON.parse(storedDarkMode);
            setIsDarkMode(userPreference);
            document.documentElement.classList.toggle('dark', userPreference);
        } else {
            // Otherwise, rely on the system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(systemPrefersDark);
            document.documentElement.classList.toggle('dark', systemPrefersDark);
            updateLocalStorage(systemPrefersDark);
        }
    }, []);

    // Updates local storage with the current dark mode preference
    const updateLocalStorage = (darkModeValue: boolean) => {
        localStorage.setItem('darkMode', JSON.stringify(darkModeValue));
    };

    // Animation variants for the theme icon
    const iconAnimationVariants = {
        hidden: { y: -10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                y: { type: 'spring', stiffness: 300, damping: 10 },
                opacity: { duration: 0.2 },
            },
        },
        exit: { y: 20, opacity: 0 },
    };

    return (
        // The theme toggle button with animation and correct aria-label for accessibility
        <button
            onClick={ toggleThemeMode }
            className="shadow-md p-2 rounded-full bg-white dark:bg-yellow-400 text-gray-700 dark:text-gray-900 transition-colors duration-200"
            aria-label={ isDarkMode ? 'Switch to light mode' : 'Switch to dark mode' }
        >
            <motion.div
                key={ isDarkMode ? 'dark' : 'light' }
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={ iconAnimationVariants }
            >
                { isDarkMode ? (
                    <Sun className="h-6 w-6"/>
                ) : (
                    <Moon className="h-6 w-6"/>
                ) }
            </motion.div>
        </button>
    );
}