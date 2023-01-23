import { DefineElementsConfig } from "./configuration/define.elements.config.mjs";
import { elements } from "./module/define.module.mjs";

class Application {
  static start() {
    this.define();
  }

  static define() {
    DefineElementsConfig.defines(elements);
  }
}

Application.start();
