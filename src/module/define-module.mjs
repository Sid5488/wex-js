import { WexRouter } from "../../lib/src/router/wex-router.mjs";
import { HomeApp } from "../pages/home-app/home-app.mjs";

const elements = [
  {
    tag: "home-app",
    element: HomeApp
  },
  {
    tag: "wex-route",
    element: WexRouter
  }
];

export { elements };
