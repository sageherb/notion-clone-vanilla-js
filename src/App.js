import "./styles/reset.css";
import { createRouter } from "./router";
import Sidebar from "./components/Sidebar/index.js";

// Sidebar 더미 데이터
export default function App() {
  const main = document.createElement("main");

  const aside = document.createElement("aside");
  aside.innerText = "aside";

  main.appendChild(Sidebar());

  return main;
}
