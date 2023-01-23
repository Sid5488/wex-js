class Header extends HTMLHeadElement {
  constructor() {
    super();

    this.show();
  }

  show() {
    document.querySelector('custom-header').style.color = 'red';
  }
}

export { Header };
