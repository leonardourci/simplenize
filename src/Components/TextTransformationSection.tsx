import React from 'react';
import { Translation } from '../types';

interface TextTransformationSectionProps {
    translation: Translation;
    input: string;
    output: string;
    selectedTransformation: string;
    textTransformationOptions: string[];
    onInputChange: (value: string) => void;
    onTransformationSelect: (transformation: string) => void;
    onCopyToClipboard: () => void;
    copySuccess: boolean;
    autoCopySuccess: boolean;
}

export default function TextTransformationSection({
    translation,
    input,
    output,
    selectedTransformation,
    textTransformationOptions,
    onInputChange,
    onTransformationSelect,
    onCopyToClipboard,
    copySuccess,
    autoCopySuccess,
}: TextTransformationSectionProps) {
    return (
        <section className="py-4 mx-4">
            <div className="min-w-full mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="py-8 px-5 space-y-2">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {translation.selectATransformation}
                        </h2>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {textTransformationOptions.map((option) => (
                                <button
                                    key={option}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                                        selectedTransformation === option
                                            ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                    onClick={() => onTransformationSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="relative flex flex-col md:flex-row gap-2">
                            <textarea
                                id="input-text"
                                value={input}
                                onChange={(e) => onInputChange(e.target.value)}
                                rows={6}
                                className="w-full lg:h-80 md:w-1/2 p-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                                placeholder={translation.inputPlaceholder}
                                aria-label="Input text"
                            />

                            <div className="flex w-full md:w-1/2">
                                <textarea
                                    id="output-text"
                                    placeholder={translation.outputPlaceholder}
                                    readOnly
                                    value={output}
                                    className="flex-grow p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                                    aria-label="Output text"
                                />
                                <button
                                    aria-label="Copy to clipboard"
                                    onClick={onCopyToClipboard}
                                    className="flex items-center justify-center border-0 px-3 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {copySuccess && (
                            <p className="text-green-600 dark:text-green-400 text-sm text-center font-medium animate-pulse" role="alert">
                                {translation.clipboardMessage}
                            </p>
                        )}

                        {autoCopySuccess && (
                            <p className="text-blue-600 dark:text-blue-400 text-sm text-center font-medium animate-pulse" role="alert">
                                {translation.autoClipboardMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
} 