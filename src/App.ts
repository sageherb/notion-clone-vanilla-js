import "@/styles/reset.css";
import "@/styles/styles.css";
import { createRouter } from "./router";
import EmptyPage from "@/pages/EmptyPage.js";
import Sidebar from "@/components/Sidebar/index.js";
import Editor from "@/components/Editor/index.js";

export default function App() {
  const router = createRouter();

  router.addRoute("/", () => router.navigate("/documents"));
  router.addRoute("/documents", () => EmptyPage());
  router.addRoute("/documents/:id", (id) => Editor(id));
  router.start();

  Sidebar({ navigate: (path: string) => router.navigate(path) });
}
