import App from "./App";

export default function render(app) {
  const root = document.getElementById("root");

  root?.replaceChildren(app());
}

render(App);
