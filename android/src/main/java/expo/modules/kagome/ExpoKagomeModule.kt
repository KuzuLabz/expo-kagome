package expo.modules.kagome

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.core.errors.ModuleDestroyedException
import java.net.URL
import android.util.Log

import kotlinx.coroutines.*

import kagome.Kagome

class ExpoKagomeModule : Module() {
  private val service = CoroutineScope(Dispatchers.IO)

  private fun handleError(promise: Promise, err: Exception) {
    promise.reject("[ImageColors]", err.message, err)
  }

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoKagome')` in JavaScript.
    Name("ExpoKagome")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    // Constants(
    //   "PI" to Math.PI
    // )

    // Defines event names that the module can send to JavaScript.
    // Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    // Function("hello") {
    //   "Hello world! 👋"
    // }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    // AsyncFunction("setValueAsync") { value: String ->
    //   // Send an event to JavaScript.
    //   sendEvent("onChange", mapOf(
    //     "value" to value
    //   ))
    // }

    AsyncFunction("tokenize") { text: String, promise: Promise ->
      service.launch {
        try {
          val result: String = Kagome.tokenize(text);
          promise.resolve(result)
        } catch (err: Exception) {
          handleError(promise, Exception("TEST"))
        } catch (err: Exception) {
          handleError(promise, Exception("TEST 2"))
        }
      }
      OnDestroy {
        try {
          service.cancel(ModuleDestroyedException())
        } catch (e: IllegalStateException) {
          Log.e("[ExpoKagome - Tokenize]", "The scope does not have a job in it")
        }
      }
    }

    AsyncFunction("analyze") { text: String, mode: Long, promise: Promise ->
      service.launch {
        try {
          val result: String = Kagome.analyze(text, mode);
          promise.resolve(result)
        } catch (err: Exception) {
          handleError(promise, Exception("TEST"))
        } catch (err: Exception) {
          handleError(promise, Exception("TEST 2"))
        }
      }
      OnDestroy {
        try {
          service.cancel(ModuleDestroyedException())
        } catch (e: IllegalStateException) {
          Log.e("[ExpoKagome - Analyze]", "The scope does not have a job in it")
        }
      }
    }

    AsyncFunction("wakati") { text: String, promise: Promise ->
      service.launch {
        try {
          val result: String = Kagome.wakati(text);
          promise.resolve(result)
        } catch (err: Exception) {
          handleError(promise, Exception("TEST"))
        } catch (err: Exception) {
          handleError(promise, Exception("TEST 2"))
        }
      }
      OnDestroy {
        try {
          service.cancel(ModuleDestroyedException())
        } catch (e: IllegalStateException) {
          Log.e("[ExpoKagome - Wakati]", "The scope does not have a job in it")
        }
      }
    }
    
    AsyncFunction("graph") { text: String, mode: Long, promise: Promise ->
      service.launch {
        try {
          val result: String = Kagome.graph(text, mode);
          promise.resolve(result)
        } catch (err: Exception) {
          handleError(promise, Exception("TEST"))
        } catch (err: Exception) {
          handleError(promise, Exception("TEST 2"))
        }
      }
      OnDestroy {
        try {
          service.cancel(ModuleDestroyedException())
        } catch (e: IllegalStateException) {
          Log.e("[ExpoKagome - Graph]", "The scope does not have a job in it")
        }
      }
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    // View(ExpoKagomeView::class) {
    //   // Defines a setter for the `url` prop.
    //   Prop("url") { view: ExpoKagomeView, url: URL ->
    //     view.webView.loadUrl(url.toString())
    //   }
    //   // Defines an event that the view can send to JavaScript.
    //   Events("onLoad")
    // }
  }
}
