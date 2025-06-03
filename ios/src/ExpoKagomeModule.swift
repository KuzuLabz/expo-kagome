import ExpoModulesCore
import Kagome

public class ExpoKagomeModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoKagome')` in JavaScript.
    Name("ExpoKagome")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    // Constants([
    //   "PI": Double.pi
    // ])

    // Defines event names that the module can send to JavaScript.
    // Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    // Function("hello") {
    //   return "Hello world! 👋"
    // }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("tokenize") { (text: String, promise: Promise) in
      // Send an event to JavaScript.
      var result = KagomeTokenize(text)
      promise.resolve(result)
    }

    AsyncFunction("analyze") { (text: String, mode: Int, promise: Promise) in
      var result = KagomeAnalyze(text, mode)
      promise.resolve(result)
    }

    AsyncFunction("wakati") { (text: String, promise: Promise) in
      var result = KagomeWakati(text)
      promise.resolve(result)
    }

    AsyncFunction("graph") { (text: String, mode: Int, promise: Promise) in
      var result = KagomeGraph(text, mode)
      promise.resolve(result)
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    // View(ExpoKagomeView.self) {
    //   // Defines a setter for the `url` prop.
    //   Prop("url") { (view: ExpoKagomeView, url: URL) in
    //     if view.webView.url != url {
    //       view.webView.load(URLRequest(url: url))
    //     }
    //   }

    //   Events("onLoad")
    // }
  }
}
