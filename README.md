# web-components

Introdution to web components with JS and HTML. Wex.JS is a JavaScript library
for build user interfaces.

## Library Structure

- Pages:
  - src/pages/your-page/your-page.mjs
  - src/pages/your-page/your-page.html
  - src/pages/your-page/your-page.css
- Components:
  - src/components/your-component/your-component.mjs
  - src/components/your-component/your-component.html
  - src/components/your-component/your-component.css

## How to define component?

To define your component must be to import the component in the file:

```bash  
src/module/define-module.mjs
```

An example:

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

## Run App

```bash
npm run start
```
