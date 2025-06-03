import { Token } from "../ExpoKagome.types";

declare global {
    export interface Window {
        Go: any;
        tokenize: (text: string) => (Omit<Token, 'features' | 'pos'> & { features: string; pos: string })[];
        analyze: (text: string, mode: number) => (Omit<Token, 'features' | 'pos'> & { features: string; pos: string })[];
        wakati: (text: string) => { words: string };
    }
}

declare module "*.wasm" {
    const content: string;
    export default content;
}

export { };