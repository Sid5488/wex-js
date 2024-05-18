class ComponentEvents {
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
