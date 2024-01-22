class BaseHTMLComponent extends HTMLElement {
	#externalElements = [];
  #path = "";
	#tagName = "";
  #isComponent;

  constructor(tagName, externalElements, isComponent = true) {
    super();

		this.#tagName = tagName;
		this.#externalElements = externalElements;
    this.#isComponent = isComponent;

    this.getPath();
    this.show();
  }

  connectedCallback() {
    console.log("DOM connected");
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
    linkElement.setAttribute(
      "href", 
      this.#isComponent 
        ? `${this.#path}/src/components/${this.#tagName}/${this.#tagName}.css`
        : `${this.#path}/src/pages/${this.#tagName}/${this.#tagName}.css`
    );

    this.shadowRoot.appendChild(linkElement);
  }

  async searchTemplate() {
    if (this.#externalElements <= 0) return;

    for (const element of this.#externalElements) {
      const htmlTemplate = this.shadowRoot.querySelector(element);
  
      if (!htmlTemplate) return;
  
      const template = await fetch(
        this.#isComponent 
          ? `${this.#path}/src/components/${htmlTemplate.localName}/${htmlTemplate.localName}.html`
          : `${this.#path}/src/pages/${htmlTemplate.localName}/${htmlTemplate.localName}.html`
      ).then(response => response.text());
  
      htmlTemplate.innerHTML += template;
    }
  }

  async fetchData() {
    return await fetch(
      this.#isComponent
      ? `${this.#path}/src/components/${this.#tagName}/${this.#tagName}.html`
      : `${this.#path}/src/pages/${this.#tagName}/${this.#tagName}.html`
    ).then(response => response.text());
  }

  get template() {
    return (async () => await this.fetchData());
  }
}

export { BaseHTMLComponent };
