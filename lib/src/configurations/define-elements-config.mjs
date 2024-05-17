class DefineElementsConfig {
  static defines(elements) {
    if (Array.isArray(elements)) {
      elements.forEach(element => {
        customElements.define(
          element.tag, 
          element.element,
          { extends: element.extends }
        );
      });
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
