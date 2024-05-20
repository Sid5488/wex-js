# Wex.JS

Wex.JS is a JavaScript library for building user interfaces using web components with JS and HTML.

## Installation

```bash
npm i -g wex-js-cli
```

## Creating a project

```bash
npx wex-js-cli <project-name>
```

## Library Structure

The library is organized into two main sections: Pages and Components.

### Pages

- `src/pages/your-page/your-page.mjs` - JavaScript module for your page logic.
- `src/pages/your-page/your-page.html` - HTML template for your page.
- `src/pages/your-page/your-page.css` - CSS styles for your page.

### Components

- `src/components/your-component/your-component.mjs` - JavaScript module for your component logic.
- `src/components/your-component/your-component.html` - HTML template for your component.
- `src/components/your-component/your-component.css` - CSS styles for your component.

## How to Define a Component

To define your component, you must import it in the `src/module/define-module.mjs` file.

### Example

Define your component in its own module file (e.g., `src/pages/home-app/home-app.mjs`):

```js
import { HomeApp } from "../pages/home-app/home-app.mjs";

const elements = [
  {
    tag: "home-app",
    element: HomeApp
  },
];

export { elements };
```

### Run the Application

```bash
npm run start
```

### Getting Started

#### Example HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/style.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Application</title>
  </head>

  <body>
    <wex-route path="/" title="Home" component="home-app"></wex-route>

    <div id="root"></div>

    <script type="module" src="../src/index.mjs"></script>
  </body>
</html>
```

#### Example Component

```js
import { Component } from './component.js';

class HomeApp extends Component {
  constructor() {
    super('home-app', [], true);
  }

  connectedCallback() {
    this.innerHTML = '<h1>Welcome to the Home Page</h1>';
  }
}

customElements.define('home-app', HomeApp);
```

#### Main Script

```js
// src/index.mjs
import { DefineElementsConfig } from "../lib/src/configurations/define-elements-config.mjs";
import { PageConstants } from "../lib/src/constants/page-constants.mjs";
import { elements } from "./module/define-module.mjs";

class Application {
  static start() {
    this.configure();
    this.define();
  }

  static configure() {
    PageConstants.pagesPath = "/src/pages/";
    PageConstants.componentsPath = "/src/components/";
  }

  static define() {
    DefineElementsConfig.defines(elements);
  }
}

Application.start();
```

```js
// src/module/define-module.mjs
import { DefineElementsConfig } from "../lib/src/configurations/define-elements-config.mjs";
import { PageConstants } from "../lib/src/constants/page-constants.mjs";
import { elements } from "./module/define-module.mjs";

class Application {
  static start() {
    this.configure();
    this.define();
  }

  static configure() {
    PageConstants.pagesPath = "/src/pages/";
    PageConstants.componentsPath = "/src/components/";
  }

  static define() {
    DefineElementsConfig.defines(elements);
  }
}

Application.start();

```

### Contributing

Thank you for considering contributing to Wex.JS! Please follow the guidelines below.
How to Contribute

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

#### License

This project is licensed under the ISC License - see the [LICENSE](https://opensource.org/licenses/ISC) file for details.
