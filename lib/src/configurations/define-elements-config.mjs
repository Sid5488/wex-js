/**
 * Class for defining custom elements configuration.
 */
class DefineElementsConfig {
  /**
   * Defines custom elements based on the provided configuration.
   * @param {Object|Object[]} elements - An object or an array of objects each containing the element configuration.
   * @param {string} elements.tag - The tag name for the custom element.
   * @param {Function} elements.element - The class that defines the behavior of the custom element.
   * @param {string} [elements.extends] - The optional tag name of the element to extend.
   * @returns {Promise<void>} - A promise that resolves when all custom elements have been defined.
   * @static
   * @async
   */
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
