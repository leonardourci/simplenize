import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import CashBackMeliuz from '../images/100-cashback-meliuz.png';
import AssineAmazonPrime from '../images/assine-amazon-prime.png';

interface AutoOpenModalProps {
    isOpen: boolean;
    setIsOpen: ( isOpen: boolean ) => void;
}

export default function AutoOpenModal ( { isOpen, setIsOpen }: AutoOpenModalProps ) {
    const [ bgImage, setBgImage ] = useState ( '' );
    const [ imageLink, setImageLink ] = useState ( '' );

    function getBgImage (): Record<'bgImage' | 'link', string> {
        const bgImages: Record<'bgImage' | 'link', string>[] = [
            {
                bgImage: CashBackMeliuz,
                link   : 'https://www.meliuz.com.br/i/ref_cab79324?ref_source=1',
            },
            {
                bgImage: AssineAmazonPrime,
                link   : 'https://amzn.to/3WpELKW',
            },
        ];

        const randomIndex = Math.floor ( Math.random () * bgImages.length );
        return bgImages[ randomIndex ];
    }

    useEffect ( () => {
        const { link, bgImage } = getBgImage ();
        setBgImage ( bgImage );
        setImageLink ( link );
    }, [] );

    function closeModal () {
        setIsOpen ( false );
        const { link, bgImage } = getBgImage ();
        setTimeout ( () => {
            setBgImage ( bgImage );
            setImageLink ( link );
        }, 500 );
    }

    function doNothing (): void {
        // Nothing to do
    }

    return (
        <Transition appear show={ isOpen } as={ Fragment }>
            <Dialog as="div" className="relative z-10" onClose={ doNothing }>
                <Transition.Child
                    as={ Fragment }
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={ Fragment }
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="relative w-full max-w-4xl max-h-[90vh] transform rounded-2xl text-left align-middle shadow-xl transition-all overflow-hidden">
                                <a
                                    href={ imageLink }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full h-full"
                                >
                                    <img
                                        src={ bgImage }
                                        alt="Promotional content"
                                        className="w-full h-auto object-contain max-h-[90vh]"
                                    />
                                </a>

                                <button
                                    type="button"
                                    className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                    onClick={ closeModal }
                                >
                                    <X className="h-6 w-6"/>
                                    <span className="sr-only">Close</span>
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

