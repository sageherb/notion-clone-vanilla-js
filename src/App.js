import "./style/reset.css";
import { createRouter } from "./router";

export default function App() {
  const router = createRouter();

  router.addRoute("/", "rootPage");

  return router.getCurrentRoute();
}
