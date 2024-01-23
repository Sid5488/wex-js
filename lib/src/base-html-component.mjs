class BaseHTMLComponent extends HTMLElement {
	#externalElements = [];
  #path = "";
  #__filename;

  constructor(__filename, externalElements) {
    super();

    [this.#__filename,] = new URL(__filename).pathname.split(".");
		this.#externalElements = externalElements;

    this.show();
  }

  connectedCallback() {
    this.getPath();
  }

  async show() {
    this.attachShadow({ mode: "open" })
      .innerHTML = await this.template();

    this.style();
    this.searchTemplate();
  }

  getPath() {
    const [path] = document.URL.split(window.location.pathname);
    this.#path = path;
  }

  async style() {
    const linkElement = document.createElement("link");

    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("href",  `${this.#path}${this.#__filename}.css`);

    this.shadowRoot.appendChild(linkElement);
  }

  async searchTemplate() {
    if (this.#externalElements <= 0) return;

    for (const element of this.#externalElements) {
      const htmlTemplate = this.shadowRoot.querySelector(element);
  
      if (!htmlTemplate) return;
  
      const template = await fetch(`${this.#path}${this.#__filename}.html`)
        .then(response => response.text());
  
      htmlTemplate.innerHTML += template;
    }
  }

  async fetchData() {
    return await fetch(`${this.#path}${this.#__filename}.html`)
      .then(response => response.text());
  }

  get template() {
    return (async () => await this.fetchData());
  }
}

export { BaseHTMLComponent };
