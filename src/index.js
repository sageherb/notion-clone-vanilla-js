import App from "./App";
import "./styles/styles.css";

export default function render(app) {
  const root = document.getElementById("root");

  root?.replaceChildren(app());
}

render(App);
