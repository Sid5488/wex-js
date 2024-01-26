import { PageConstants } from "./constants/page-constants.mjs";
import { getResources } from "./helpers/get-resources.mjs";

class BaseHTMLComponent extends HTMLElement {
	#externalElements = [];
  #pagesDir;
  #componentsDir;
  #tagName;
  #isComponent;

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
  
      // htmlTemplate.innerHTML += template;
    }
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

export { BaseHTMLComponent };
