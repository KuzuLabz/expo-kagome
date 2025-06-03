import { requireNativeModule } from 'expo';

declare class ExpoKagomeModule {
  tokenize(text: string): Promise<string>;
  analyze(text: string, mode: number): Promise<string>;
  wakati(text: string): Promise<string>;
  graph(text: string, mode: number): Promise<string>;
}

// // This call loads the native module object from the JSI.
// export default requireNativeModule<ExpoKagomeModule>('ExpoKagome');

export default requireNativeModule<ExpoKagomeModule>('ExpoKagome')