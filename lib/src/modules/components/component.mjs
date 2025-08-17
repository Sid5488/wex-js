import { AttributeConstants } from "../../constants/attribute-constants.mjs";
import { PageConstants } from "../../constants/page-constants.mjs";
import { getResources } from "../../helpers/get-resources.mjs";
import { ComponentEvents } from "../events/components-events.mjs";

/**
 * Custom HTML element class for dynamic component creation.
 * @extends {HTMLElement}
 */
class Component extends HTMLElement {
	/** @type {Array} */
  #externalElements = [];
  /** @type {string} */
  #pagesDir;
  /** @type {string} */
  #componentsDir;
  /** @type {string} */
  #tagName;
  /** @type {boolean} */
  #isComponent;

  /**
   * Creates an instance of Component.
   * @param {string} tagName - The tag name of the component.
   * @param {Array} externalElements - List of external elements to include.
   * @param {boolean} [isComponent=false] - Flag indicating if it is a component.
   */
  constructor(tagName, externalElements, isComponent = false) {
    super();

    this.#tagName = tagName;
		this.#externalElements = externalElements;
		this.#isComponent = isComponent;
    
    this.configurePagesDir();
    this.configureComponentsDir();
    this.show();
  }

  /**
   * Configures the directory path for pages.
   */
  configurePagesDir() {
    const path = PageConstants.pagesPath;

    if (path[0] !== "/") this.#pagesDir = "/" + PageConstants.pagesPath
    else this.#pagesDir = path;

    if (path[path.length -1] !== "/") this.#pagesDir = path + "/";

    this.#pagesDir += this.#tagName + "/" + this.#tagName;
    PageConstants.treatedPagesPath = this.#pagesDir;
  }

  /**
   * Configures the directory path for components.
   */
  configureComponentsDir() {
    const path = PageConstants.componentsPath;

    if (path[0] !== "/") this.#componentsDir = "/" + PageConstants.componentsPath
    else this.#componentsDir = path;

    if (path[path.length -1] !== "/") this.#componentsDir = path + "/";

    this.#componentsDir += this.#tagName + "/" + this.#tagName;
    PageConstants.treatedComponentsPath = this.#componentsDir;
  }

  /**
   * Lifecycle callback when the element is added to the DOM.
   */
  connectedCallback() {}

  /**
   * Displays the component by attaching a shadow DOM and setting its inner HTML.
   * @returns {Promise<void>}
   */
  async show() {
    this.attachShadow({ mode: "open" })
      .innerHTML = await this.template();

    this.connectedCallback();

    this.style();
    this.searchTemplate();
  }

  /**
   * Applies styles to the component by fetching and attaching the CSS resource.
   * @returns {Promise<void>}
   */
  async style() {
    const linkElement = document.createElement("link");
    const searchResource = this.#isComponent 
      ? `${this.#componentsDir}.css` 
      : `${this.#pagesDir}.css`;

    await getResources(searchResource).then(response => {
      if (response) {
        linkElement.setAttribute("rel", "stylesheet");
        linkElement.setAttribute("href", searchResource);
    
        this.shadowRoot.appendChild(linkElement);
      }
    });
  }

  /**
   * Searches for and applies external templates to the component.
   * @returns {Promise<void>}
   */
  async searchTemplate() {
    if (this.#externalElements <= 0) return;

    for (const element of this.#externalElements) {
      const htmlTemplate = this.shadowRoot.querySelector(element);
  
      if (!htmlTemplate) return;
  
      const template = await getResources(
        this.#isComponent 
          ? `${this.#componentsDir}.css` 
          : `${this.#pagesDir}.css`
      ).catch(error => console.log(error));

      htmlTemplate.innerHTML += template;

      this.interpreterAttributes(
        this.shadowRoot.querySelectorAll(AttributeConstants.attributes),
        document.querySelectorAll(AttributeConstants.attributes)
      );
    }
  }

  /**
   * Renders a template by replacing placeholders with actual data values.
   * @param {string} template - The template string containing placeholders.
   * @param {Object} data - The data object to replace placeholders with.
   * @returns {string} - The rendered template string.
   */
  renderTemplate(template, data) {
    const regex = /{{\s*([a-zA-Z0-9_.]+)\s*}}/g;

    return template.replace(regex, (match, p1) => {
      const keys = p1.split('.');
      let value = data;

      if (typeof value === "object") {
        for (const key of keys) {
          value = value[key];
  
          if (value === undefined) return '';
        }
      }

      return value
    });
  }

  /**
   * Renders the value of a data-bound attribute by evaluating it.
   * @param {string} data - The data string to evaluate.
   * @returns {string} - The rendered attribute value.
   */
  renderAttributeValue(data) {
    const regex = /{{\s*([a-zA-Z0-9_.]+)\s*}}/g;
    const removeMarkup = data.replace(regex, (match, value) => value);
    return eval(`this.${removeMarkup}._value`);
  }

  /**
   * Interprets custom attributes (prefixed with "w-") and applies corresponding logic.
   * @param {NodeList} shadowElements - List of elements in the shadow DOM.
   * @param {NodeList} elements - List of elements in the light DOM.
   */
  interpreterAttributes(shadowElements, elements) {
    Array.from(shadowElements).forEach((element, index) => {
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith("w-")) {
          const attributeName = attr.name.substr(2);
          const attributeValue = attr.value.trim();

          if (attributeName.startsWith("for")) {
            const [, iterableName] = attributeValue.split(" in ");
            const iterable = eval(`this.${iterableName}`);

            let content = '';

            if (iterable._value !== null) {
              for (const item of iterable._value) {
                content += this.renderTemplate(elements[index].innerHTML, item);
              }

              element.innerHTML = content;
            } else element.innerHTML = "";
          }

          if (attributeName.startsWith("if")) {
            if (eval(`this.${attributeValue}._value`)) {
              element.removeAttribute("hidden")
            } else {
              element.setAttribute("hidden", "true");
            }
          }

          if (attributeName.startsWith("on-change")) {
            ComponentEvents.addEvent(element, "input", event => {
              this.name._value = event.target.value;
            });
          }

          if (attributeName.startsWith("on-click")) {
            ComponentEvents.addEvent(element, "click", _ => {
              const func = element.getAttribute('w-on-click');

              eval(`this.${func}`);
            });
          }

          if (attributeName.startsWith("value")) {
            element.innerHTML = eval(`this.${attributeValue}._value`);
          }
        }

        if (attr.name.startsWith("value")) {
          const attributeValue = attr.value.trim();

          element.value = this.renderAttributeValue(attributeValue);;
        }
      });
    });
  }

  /**
   * Fetches HTML data for the component.
   * @returns {Promise<string>} - The fetched HTML data.
   */
  async fetchData() {
    return await getResources(
      this.#isComponent 
        ? `${this.#componentsDir}.html` 
        : `${this.#pagesDir}.html`
    ).catch(error => console.log(error));
  }

  /**
   * Getter for the template, which fetches the HTML data.
   * @returns {Promise<string>} - The template HTML string.
   */
  get template() {
    return (async () => await this.fetchData());
  }
}

export { Component };
