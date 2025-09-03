import "./styles/reset.css";
import Sidebar from "./components/Sidebar/index.js";
import { createRouter } from "./router.js";
import Editor from "./components/Editor/index.js";

export default function App() {
  const router = createRouter();

  const main = document.createElement("main");
  main.appendChild(Sidebar());
  main.appendChild(Editor());

  router.addRoute("/", "emptyPage");
  router.addRoute("/documents", "emptyPage");
  router.addRoute("/documents/:id", main);

  return main;
}
