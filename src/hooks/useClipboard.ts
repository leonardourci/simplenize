import { useState, useCallback } from 'react';
import { COPY_SUCCESS_DISPLAY_DURATION } from '../constants';

export const useClipboard = () => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [autoCopySuccess, setAutoCopySuccess] = useState(false);

    const copyToClipboard = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
            }, COPY_SUCCESS_DISPLAY_DURATION);
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }, []);

    const autoCopyToClipboard = useCallback(async (text: string) => {
        if (text) {
            try {
                await navigator.clipboard.writeText(text);
                setAutoCopySuccess(true);
                setTimeout(() => {
                    setAutoCopySuccess(false);
                }, COPY_SUCCESS_DISPLAY_DURATION);
                return true;
            } catch (error) {
                console.error('Failed to auto-copy to clipboard:', error);
                return false;
            }
        }
        return false;
    }, []);

    return {
        copySuccess,
        autoCopySuccess,
        copyToClipboard,
        autoCopyToClipboard,
    };
}; 