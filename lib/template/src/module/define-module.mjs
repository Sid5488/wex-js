import { WexRouter } from "wex-js";

import { TextApp } from "../components/text-app/text-app.mjs";
import { HomeApp } from "../pages/home-app/home-app.mjs";

const elements = [
  {
    tag: "home-app",
    element: HomeApp
  },
  {
    tag: "text-app",
    element: TextApp
  },
  {
    tag: "wex-route",
    element: WexRouter
  }
];

export { elements };
