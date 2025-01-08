import React, { useState, useEffect } from 'react';
import SimplenizeHeaderLogo from './images/simplenize-logo.png';

const transformationOptions = [ 'MAIÚSCULAS', 'MINÚSCULAS', 'Parágrafos para uma linha', 'Primeiras Em Maiúsculas' ];

export default function App () {
    const [ input, setInput ] = useState ( '' );
    const [ output, setOutput ] = useState ( '' );
    const [ copySuccess, setCopySuccess ] = useState ( false );
    const [ selectedTransformation, setSelectedTransformation ] = useState<string> ( '' );

    const setTransformation = ( transformation: string ) => {
        setSelectedTransformation ( prev => prev === transformation ? '' : transformation );
    };

    useEffect ( () => {
        let transformedOutput = input;

        switch ( selectedTransformation ) {
            case 'Parágrafos para uma linha':
                transformedOutput = transformedOutput.replace ( /\s+|\n/g, ' ' ).trim ();
                break;
            case 'MAIÚSCULAS':
                transformedOutput = transformedOutput.toUpperCase ();
                break;
            case 'Primeiras Em Maiúsculas':
                const result: string[] = [];
                const textWords = transformedOutput.split ( ' ' );
                for ( const word of textWords ) {
                    if ( word.length ) {
                        const capitalizedWord = word.slice ( 1 );
                        result.push ( word[ 0 ].toUpperCase () + capitalizedWord );
                    }
                }

                const finalResult: string[] = [];
                const multipleLinesSplit = result.join ( ' ' ).split ( '\n' );

                for ( const word of multipleLinesSplit ) {
                    if ( word.length ) {
                        const capitalizedWord = word.slice ( 1 );
                        const lastCharacter = selectedTransformation.includes ( 'Parágrafos para uma linha' ) ? ' ' : '\n';
                        finalResult.push ( word[ 0 ].toUpperCase () + capitalizedWord + lastCharacter );
                    }
                }

                transformedOutput = finalResult.join ( '' );
                break;
            case 'MINÚSCULAS':
                transformedOutput = transformedOutput.toLowerCase ();
                break;
        }

        setOutput ( transformedOutput );
    }, [ input, selectedTransformation ] );

    const copyToClipboard = () => {
        navigator.clipboard.writeText ( output ).then ( () => {
            setCopySuccess ( true );
            setTimeout ( () => {
                setCopySuccess ( false );
            }, 2500 );
        } ).catch ( ( err ) => {
            console.error ( 'Falha ao copiar texto: ', err );
        } );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <header className="w-full py-6 bg-white shadow-md">
                <div className="container mx-auto px-4">
                    <img className="mx-auto h-12 w-auto" src={ SimplenizeHeaderLogo } alt="Simplenize"/>
                </div>
            </header>

            <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-8 space-y-8">
                            <div>
                                <label htmlFor="multiline" className="block text-xl font-semibold text-gray-800 mb-3">
                                    Texto para transformar:
                                </label>
                                <textarea
                                    id="multiline"
                                    value={ input }
                                    onChange={ ( e ) => setInput ( e.target.value ) }
                                    rows={ 6 }
                                    className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                                    placeholder="Escreva seu texto em parágrafos aqui..."
                                />
                            </div>

                            <div>
                                <h2 className="block text-xl font-semibold text-gray-800 mb-3">
                                    Selecione uma transformação:
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    { transformationOptions.map ( ( option ) => (
                                        <button
                                            key={ option }
                                            className={ `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                                                selectedTransformation === option
                                                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }` }
                                            onClick={ () => setTransformation ( option ) }
                                        >
                                            { option }
                                        </button>
                                    ) ) }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="singleline" className="block text-xl font-semibold text-gray-800 mb-3">
                                    Resultado:
                                </label>
                                <div className="flex">
                                    <textarea
                                        readOnly
                                        value={ output }
                                        className="flex-grow p-4 border-2 border-gray-300 rounded-l-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                                    />
                                    <button
                                        aria-label="Copiar para área de transferência"
                                        onClick={ copyToClipboard }
                                        className="flex items-center justify-center px-6 border-2 border-l-0 border-gray-300 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 }
                                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            { copySuccess && (
                                <p className="text-green-600 text-sm text-center font-medium animate-pulse"
                                   role="alert">Texto copiado com sucesso!</p>
                            ) }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

