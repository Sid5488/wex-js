import { CustomApplication } from "../CustomApplication.mjs";
import { Header } from "../components/custom-header/header.mjs";

const elements = [
  {
    tag: 'custom-header',
    element: Header,
    extends: 'head'
  },
  {
    tag: 'custom-application',
    element: CustomApplication,
    extends: 'div'
  }
];

export { elements };
