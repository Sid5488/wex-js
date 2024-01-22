import { WexRouter } from "../../lib/src/router/wex-router.mjs";
import { CustomHeader } from "../components/custom-header/custom-header.mjs";
import { CustomTitle } from "../components/custom-title/custom-title.mjs";
import { AnotherPage } from "../pages/another-page/another-page.mjs";
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
  },
  {
    tag: "wex-route",
    element: WexRouter
  },
  {
    tag: "another-page",
    element: AnotherPage
  }
];

export { elements };
