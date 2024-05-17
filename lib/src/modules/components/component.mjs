import { AttributeConstants } from "../../constants/attribute-constants.mjs";
import { PageConstants } from "../../constants/page-constants.mjs";
import { getResources } from "../../helpers/get-resources.mjs";

class Component extends HTMLElement {
	#externalElements = [];
  #pagesDir;
  #componentsDir;
  #tagName;
  #isComponent;
  #attributeTemplate;

  constructor(tagName, externalElements, isComponent = false) {
    super();

    this.#tagName = tagName;
		this.#externalElements = externalElements;
		this.#isComponent = isComponent;
    
    this.configurePagesDir();
    this.configureComponentsDir();
    this.show();
  }

  configurePagesDir() {
    const path = PageConstants.pagesPath;

    if (path[0] !== "/") this.#pagesDir = "/" + PageConstants.pagesPath
    else this.#pagesDir = path;

    if (path[path.length -1] !== "/") this.#pagesDir = path + "/";

    this.#pagesDir += this.#tagName + "/" + this.#tagName;
    PageConstants.treatedPagesPath = this.#pagesDir;
  }

  configureComponentsDir() {
    const path = PageConstants.componentsPath;

    if (path[0] !== "/") this.#componentsDir = "/" + PageConstants.componentsPath
    else this.#componentsDir = path;

    if (path[path.length -1] !== "/") this.#componentsDir = path + "/";

    this.#componentsDir += this.#tagName + "/" + this.#tagName;
    PageConstants.treatedComponentsPath = this.#componentsDir;
  }

  connectedCallback() {}

  async show() {
    this.attachShadow({ mode: "open" })
      .innerHTML = await this.template();

    this.connectedCallback();

    this.style();
    this.searchTemplate();
  }

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
        this.shadowRoot.querySelectorAll(AttributeConstants.attributes)
      );
    }
  }

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

      return value;
    });
  }

  setAttributeTemplate(element) {
    this.#attributeTemplate = element.innerHTML;
  }

  interpreterAttributes(elements) {
    Array.from(elements).forEach(element => {
      Array.from(element.attributes).forEach(attr => {
        if (attr.name.startsWith("w-")) {
          const attributeName = attr.name.substr(2);
          const attributeValue = attr.value.trim();

          if (
            this.#attributeTemplate === null || 
            this.#attributeTemplate === undefined ||
            this.#attributeTemplate === ""
          ) {
            this.setAttributeTemplate(element);
          }
  
          if (attributeName.startsWith("for")) {
            const [, iterableName] = attributeValue.split(" in ");
            const iterable = eval(`this.${iterableName}`);
            
            let content = '';

            if (iterable._value != null) {
              for (const item of iterable._value) {
                content += this.renderTemplate(this.#attributeTemplate, item);
              }
              
              element.innerHTML = content;
            } else element.innerHTML = '';
          }
  
          if (attributeName.startsWith("if")) {
            if (eval(`this.${attributeValue}`)) 
              element.removeAttribute(`w-${attributeName}`);
            else 
              element.parentNode.removeChild(element);
          }
        }
      });
    });
  }

  async fetchData() {
    return await getResources(
      this.#isComponent 
        ? `${this.#componentsDir}.html` 
        : `${this.#pagesDir}.html`
    ).catch(error => console.log(error));
  }

  get template() {
    return (async () => await this.fetchData());
  }
}

export { Component };
