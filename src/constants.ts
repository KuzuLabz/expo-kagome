import { AnalyzeMode } from "./ExpoKagome.types";

export const Modes: { [key in AnalyzeMode]: number } = {
    normal: 1,
    search: 2,
    extend: 3
}