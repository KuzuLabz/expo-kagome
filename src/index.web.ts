import { Modes } from './constants';
import { AnalyzeMode, Token } from './ExpoKagome.types.js';
import './web/wasm_exec.js';
// import kagomeWasmPath from './web/kagome.wasm';

export const initializeKagomeAsync = async () => {
    const goWasm = new window.Go();
    const kagomeWasmPath = require('./web/kagome.wasm');
    const result = await WebAssembly.instantiateStreaming(fetch(kagomeWasmPath), goWasm.importObject);
    goWasm.run(result.instance);
};

export const initializeKagome = () => {
    const goWasm = new window.Go();
    const kagomeWasmPath = require('./web/kagome.wasm');
    WebAssembly.instantiateStreaming(fetch(kagomeWasmPath), goWasm.importObject).then((result) => {
        goWasm.run(result.instance);
    })
}

/**
 * Basic tokenization
 * @param text - The text to be tokenized.
 */
export const getTokens = async (text: string) => {
    if (text && text.length > 0 && !!window.Go) {
        const result = window.tokenize(text);
        const tokens = result.map((token) => ({
            ...token,
            features: token.features.split(","),
        })) as Token[];
        return tokens;
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
        const result = window.analyze(text, Modes[mode]);
        const tokens = result.map((token) => ({
            ...token,
            features: token.features.split(","),
        })) as Token[];
        return tokens;
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
        return window.wakati(text ?? "")?.words?.split(",");
    }
    return null;
};