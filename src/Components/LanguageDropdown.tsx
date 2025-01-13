'use client';

import { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { ChevronsUpDownIcon as ChevronUpDownIcon } from 'lucide-react';

type Language = 'PT' | 'EN'

interface LanguageSelectorProps {
    language: Language;
    setLanguage: ( language: Language ) => void;
}

const languages: { id: Language; name: string; flag: string }[] = [
    { id: 'PT', name: 'Portuguese', flag: '🇧🇷' }, // Brazil flag
    { id: 'EN', name: 'English', flag: '🇺🇸' }, // USA flag
];

export default function LanguageSelector ( { language, setLanguage }: LanguageSelectorProps ) {
    const [ selectedLanguage, setSelectedLanguage ] = useState ( languages.find ( lang => lang.id === language ) || languages[ 0 ] );

    useEffect ( () => {
        const storedLanguage = localStorage.getItem ( 'language' ) as Language;
        if ( storedLanguage ) {
            const lang = languages.find ( lang => lang.id === storedLanguage );
            if ( lang ) {
                setSelectedLanguage ( lang );
                setLanguage ( lang.id );
            }
        }
    }, [ setLanguage ] );

    const handleLanguageChange = ( selected: typeof selectedLanguage ) => {
        setSelectedLanguage ( selected );
        setLanguage ( selected.id );
        localStorage.setItem ( 'language', selected.id );
    };

    return (
        <Listbox value={ selectedLanguage } onChange={ handleLanguageChange }>
            <div className="relative">
                <Listbox.Button
                    className="relative w-full cursor-pointer rounded-lg bg-white py-0.5 pl-3 pr-8 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm z-10">
                    <span className="z-10 block text-xl">{ selectedLanguage.flag }</span>
                    <span className="z-10 pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="z-10 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                </Listbox.Button>
                <Transition
                    as={ motion.div }
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        { languages.map ( ( lang ) => (
                            <Listbox.Option
                                key={ lang.id }
                                className={ ( { active } ) =>
                                    `cursor-pointer relative select-none py-2 px-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={ lang }
                            >
                                { ( { selected } ) => (
                                    <motion.div
                                        initial={ { opacity: 0, y: -10 } }
                                        animate={ { opacity: 1, y: 0 } }
                                        transition={ { duration: 0.2 } }
                                        className="flex items-center justify-center"
                                    >
                                        <span className="z-10 block text-2xl">{ lang.flag }</span>
                                        { selected && (
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600">
                                            </span>
                                        ) }
                                    </motion.div>
                                ) }
                            </Listbox.Option>
                        ) ) }
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}

