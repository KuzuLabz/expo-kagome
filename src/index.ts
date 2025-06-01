import ExpoKagomeModule from './ExpoKagomeModule';
import { AnalyzeMode, Token } from './ExpoKagome.types';
import { Modes } from './constants';

/**
 * Loads the Kagome WebAssembly module and initializes it.
 * @returns {Promise<boolean>}
 * 
 * @platform web
 */
export const initializeKagomeAsync = async () => { };
export const initializeKagome = () => { }

/**
 * Basic tokenization
 * @param text - The text to be tokenized.
 */
export const getTokens = async (text: string) => {
    if (text && text.length > 0) {
        const tokens = await ExpoKagomeModule.tokenize(text);
        return JSON.parse(tokens) as Token[];
    }
    return null;
};

/**
 * Tokenization with mode selection
 * @param text - The text to be analyzed.
 * @param mode - The analysis mode. Can be 'normal', 'search', or 'extend'.
 * @returns 
 */
export const getAnalysis = async (text: string, mode: AnalyzeMode = 'normal') => {
    if (text && text.length > 0) {
        const tokens = await ExpoKagomeModule.analyze(text, Modes[mode]);
        return JSON.parse(tokens) as Token[];
    }
    return null;
};

/**
 * Segmentation of text into words
 * @param text - The text to be segmented.
 * @returns list of words
 */
export const getWakati = async (text: string) => {
    if (text && text.length > 0) {
        const tokens = await ExpoKagomeModule.wakati(text);
        return JSON.parse(tokens) as string[];
    }
    return null;
};

export * from './ExpoKagome.types';
