class Header extends HTMLHeadElement {
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

    return await fetch(`${path}/src/components/custom-header/custom-header.html`)
      .then(response => response.text());
  }

  get template() {
    return (async () => await this.fetchData());
  }
}

export { Header };
