import { CustomHeader } from "../components/custom-header/custom-header.mjs";
import { CustomTitle } from "../components/custom-title/custom-title.mjs";
import { HomeApp } from "../pages/home-app/home-app.mjs";

const elements = [
  {
    tag: "custom-header",
    element: CustomHeader
  },
  {
    tag: "custom-title",
    element: CustomTitle
  },
  {
    tag: "home-app",
    element: HomeApp
  }
];

export { elements };
