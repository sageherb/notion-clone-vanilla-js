import "./styles/reset.css";
import Sidebar from "./components/Sidebar/index.js";
import { createRouter } from "./router.js";
import Editor from "./components/Editor/index.js";

export default function App() {
  const router = createRouter();

  const main = document.createElement("main");
  Sidebar().then((sidebarEl) => {
    main.appendChild(sidebarEl);
  });
  main.appendChild(Editor());

  router.addRoute("/", "empty");
  router.addRoute("/documents", "empty");
  router.addRoute("/documents/:id", main);
  router.start();

  return main;
}
