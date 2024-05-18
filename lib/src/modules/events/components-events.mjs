/**
 * Class for managing component events.
 */
class ComponentEvents {
  /**
   * Adds an event listener to the specified element if it doesn't already exist.
   * @param {HTMLElement} element - The HTML element to attach the event listener to.
   * @param {string} type - The type of event to listen for.
   * @param {EventListenerOrEventListenerObject} event - The event listener function or object.
   * @returns {void}
   * @static
   */
  static addEvent(element, type, event) {
    if (element["events"] === undefined) {
      element.addEventListener(type, event);

      element["events"] = [type];
    }

    if (!element["events"].includes(type)) {
      element.addEventListener(type, event);
    }
  }
}

export { ComponentEvents };
