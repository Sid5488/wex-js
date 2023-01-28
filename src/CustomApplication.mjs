class CustomApplication extends HTMLDivElement {
  constructor() {
    super();

    this.show();
  }

  async show() {
    this.attachShadow({ mode: 'open' })
      .innerHTML = await this.template();
  }

  async fetchData() {
    const [path] = document.URL.split('/public');

    return await fetch(`${path}/src/index.html`)
      .then(response => response.text());
  }

  get template() {
    return (async () => await this.fetchData());
  }
}

export { CustomApplication };
