class CustomApplication extends HTMLDivElement {
  constructor() {
    super();

    this.show();
  }

  show() {
    const customApplication = document.querySelector('custom-application');

    console.log(customApplication);
  }
}

export { CustomApplication };
