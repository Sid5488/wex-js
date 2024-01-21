import { BaseHTMLComponent } from "../../../lib/src/BaseHTMLComponent.mjs";

class CustomHeader extends BaseHTMLComponent {
  constructor() {
    const elements = ["custom-title"];

    super("custom-header", elements);
  }
}

export { CustomHeader };
