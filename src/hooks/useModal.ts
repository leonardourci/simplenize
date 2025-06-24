import { useState, useCallback } from 'react';
import { COPY_TO_CLIPBOARD_TIMES_BEFORE_OPEN_MODAL } from '../constants';

export const useModal = (initialOpen: boolean = false) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [copyCount, setCopyCount] = useState(0);

    const openModal = useCallback(() => {
        if (copyCount >= COPY_TO_CLIPBOARD_TIMES_BEFORE_OPEN_MODAL) {
            setCopyCount(0);
            setIsOpen(true);
        }
    }, [copyCount]);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const incrementCopyCount = useCallback(() => {
        setCopyCount(prev => prev + 1);
    }, []);

    const resetCopyCount = useCallback(() => {
        setCopyCount(0);
    }, []);

    return {
        isOpen,
        copyCount,
        openModal,
        closeModal,
        incrementCopyCount,
        resetCopyCount,
    };
}; 