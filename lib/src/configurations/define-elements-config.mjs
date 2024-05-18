class DefineElementsConfig {
  static async defines(elements) {
    if (Array.isArray(elements)) {
      for (const element of elements) {
        customElements.define(
          element.tag, 
          element.element,
          { extends: element.extends }
        );
      }
    } else {
      customElements.define(
        elements.tag, 
        elements.element, 
        { extends: elements.extends }
      );
    }
  }
}

export { DefineElementsConfig };
