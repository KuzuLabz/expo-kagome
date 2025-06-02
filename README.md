# expo-kagome

A Japanese morphological analyzer using the IPA dictionary.

### Sizes
```
aar: 53MB
xcframework: 56.9MB
wasm: 15MB
```

# To-do
- [ ] lower wasm file size

# Install
### Bun
```
bun add expo-kagome
```
### Yarn
```
yarn add expo-kagome
```
### Npm
```
npm install expo-kagome
```

## Installation in bare React Native projects
For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Configure for iOS

Run `npx pod-install` after installing the npm package.

# Usage
[Full example](https://github.com/KuzuLabz/expo-kagome/example/App.tsx)
```ts
import { getTokens } from 'expo-kagome';

const text = '私は日本語を勉強しています。';
const tokens = await getTokens(text);
```

### Web
The WASM file needs to be loaded before using.
```typescript
import { initializeKagome, initializeKagomeAsync } from 'expo-kagome';

// for example, in App.tsx
initializeKagome();

// or asyncronously
await initializeKagomeAsync();
```

<!-- # API documentation

- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/kagome/)
- [Documentation for the main branch](https://docs.expo.dev/versions/unversioned/sdk/kagome/) -->


# API
### [Functions](https://github.com/KuzuLabz/expo-kagome/src/ExpoKagome.types.ts)

#### `getTokens(text: string): Promise<Token[]>`
Basic tokenization
- **text**: The text to be analyzed.
- **returns**: [Token[]]()

#### `getAnalysis(text: string, mode: AnalyzeMode = 'normal'): Promise<Token[]>`
Same as `getTokens`, but with an additional `mode` parameter.  
- **text**: The text to be analyzed.
- **mode**: [AnalyzeMode]()
- **returns**: [Token[]]()

#### `getWakati(text: string): Promise<string[]>`
Segmentation of text into words
- **text**: The text to be segmented.
- **returns**: string[]

### [Types](https://github.com/KuzuLabz/expo-kagome/src/ExpoKagome.types.ts)
#### [Token](https://github.com/KuzuLabz/expo-kagome/src/ExpoKagome.types.ts)
An object with the following properties:
  - **word_id**: The ID of the token.
  - **word_position**: The position of the token in the text.
  - **base_form**: The base form of the token.
  - **surface_form**: The surface form of the token.
  - **reading**: The reading of the token.
  - **features**: An array of features of the token. Each feature is a string.
  - **pos**: The part of speech of the token.
  - **pronunciation**: The pronunciation of the token.

#### [AnalyzeMode]()
The mode of analysis. Can be one of the following:
  - `normal`
  - `search`
  - `extend`

For more information about these modes, refer to the [Kagome documentation](https://github.com/ikawaha/kagome?tab=readme-ov-file#segmentation-modes).

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/KuzuLabz/expo-kagome/blob/main/CONTRIBUTING.md).
