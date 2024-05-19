import { DefineElementsConfig } from "../lib/src/configurations/define-elements-config.mjs";
import { PageConstants } from "../lib/src/constants/page-constants.mjs";
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
