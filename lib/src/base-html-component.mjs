import { PageConstants } from "./constants/page-constants.mjs";

class BaseHTMLComponent extends HTMLElement {
	#externalElements = [];
  #pagesDir;
  #tagName;

  constructor(tagName, externalElements) {
    super();

    this.#tagName = tagName;
		this.#externalElements = externalElements;
    
    this.configurePagesDir();
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

  connectedCallback() {}

  async show() {
    this.attachShadow({ mode: "open" })
      .innerHTML = await this.template();

    this.style();
    this.searchTemplate();
  }

  async style() {
    const linkElement = document.createElement("link");

    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href",  `${this.#pagesDir}.css`);

    this.shadowRoot.appendChild(linkElement);
  }

  async searchTemplate() {
    if (this.#externalElements <= 0) return;

    for (const element of this.#externalElements) {
      const htmlTemplate = this.shadowRoot.querySelector(element);
  
      if (!htmlTemplate) return;
  
      const template = await fetch(`${this.#pagesDir}.html`)
        .then(response => response.text());
  
      htmlTemplate.innerHTML += template;
    }
  }

  async fetchData() {
    return await fetch(`${this.#pagesDir}.html`)
      .then(response => response.text());
  }

  get template() {
    return (async () => await this.fetchData());
  }
}

export { BaseHTMLComponent };
