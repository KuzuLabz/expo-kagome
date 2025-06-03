export type Token = {
  "word_id": number,
  "word_type": string,
  "word_position": number,
  "features": string[],
  "surface_form": string,
  "pos": string[],
  "base_form": string,
  "reading": string,
  "pronunciation": string,
};
export type AnalyzeMode = 'normal' | 'search' | 'extend';