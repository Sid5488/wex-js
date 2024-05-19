import { DefineElementsConfig } from "wex-js";
import { PageConstants } from "wex-js";

import { elements } from "./module/define-module.mjs";

class Application {
  static start() {
    this.configure();
    this.define();
  }

  static configure() {
    PageConstants.pagesPath = "/src/pages/";
    PageConstants.componentsPath = "/src/components/";
  }

  static define() {
    DefineElementsConfig.defines(elements);
  }
}

Application.start();
