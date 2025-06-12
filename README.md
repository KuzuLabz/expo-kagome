# expo-kagome
<div>
  <img alt="Android" src="https://img.shields.io/badge/Android-grey?style=flat-square&logo=android" />
  <img alt="iOS" src="https://img.shields.io/badge/iOS-grey?style=flat-square&logo=apple" />
  <img alt="web" src="https://img.shields.io/badge/Web-grey?style=flat-square&logo=webassembly" />
</div>

A react native port of [Kagome](https://github.com/ikawaha/kagome) using the IPA dictionary.

### Sizes
```
aar: 53MB
xcframework: 56.9MB
wasm: 15MB
```

# To-do
- [ ] support user dict
- [ ] lower wasm file size

# Install
### Bun
```
bun add @kuzulabz/expo-kagome
```
### Yarn
```
yarn add @kuzulabz/expo-kagome
```
### Npm
```
npm install @kuzulabz/expo-kagome
```

## Installation in bare React Native projects
For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Configure for iOS

Run `npx pod-install` after installing the npm package.

# Usage
[Full example](https://github.com/KuzuLabz/expo-kagome/blob/main/example/App.tsx)
```ts
import { getTokens } from '@kuzulabz/expo-kagome';

const text = '私は日本語を勉強しています。';
const tokens = await getTokens(text);
```

### Web
Web requires these extra steps:
#### Metro Config
Add ```config.resolver.assetExts.push('wasm');``` to your metro config file.

#### Load WASM
```typescript
import { initializeKagome, initializeKagomeAsync } from '@kuzulabz/expo-kagome';

// for example, in App.tsx
initializeKagome();

// or asyncronously
await initializeKagomeAsync();
```

# API
### [Functions](https://github.com/KuzuLabz/expo-kagome/blob/main/src/ExpoKagome.types.ts)

#### `getTokens(text: string): Promise<Token[]>`
Basic tokenization
- **text**: The text to be analyzed.
- **returns**: [Token[]](#token)

#### `getAnalysis(text: string, mode: AnalyzeMode = 'normal'): Promise<Token[]>`
Same as `getTokens`, but with an additional `mode` parameter.  
- **text**: The text to be analyzed.
- **mode**: [AnalyzeMode](#analyzemode) (default: normal)
- **returns**: [Token[]](#token)

#### `getWakati(text: string): Promise<string[]>`
Segmentation of text into words
- **text**: The text to be segmented.
- **returns**: string[]

#### `getGraph(text: string, mode: AnalyzeMode = 'normal'): Promise<string>`
Generate a graph of the tokenization process in Graphvis dot format.  
- **text**: The text to be analyzed.
- **mode**: [AnalyzeMode](#analyzemode) (default: normal)
- **returns**: A Graphvis in [dot format](https://graphviz.org/doc/info/lang.html) (string)

### [Types](https://github.com/KuzuLabz/expo-kagome/blob/main/src/ExpoKagome.types.ts)
#### [Token](https://github.com/KuzuLabz/expo-kagome/blob/main/src/ExpoKagome.types.ts)
An object with the following properties:
  - **word_id**\<number\>: The ID of the token.
  - **word_position**\<number\>: The position of the token in the text.
  - **word_type**\<string\>: The word class.
  - **base_form**\<string\>: The base form of the token.
  - **surface_form**\<string\>: The surface form of the token.
  - **reading**\<string\>: The reading of the token.
  - **features**\<string[]\>: An array of features of the token. Each feature is a string.
  - **pos**\<string[]\>: The part of speech of the token.
  - **pronunciation**\<string\>: The pronunciation of the token.

#### [AnalyzeMode]()
The mode of analysis. Can be one of the following:
  - `normal`
  - `search`
  - `extend`

For more information about these modes, refer to the [Kagome documentation](https://github.com/ikawaha/kagome?tab=readme-ov-file#segmentation-modes).

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/KuzuLabz/expo-kagome/blob/main/CONTRIBUTING.md).
