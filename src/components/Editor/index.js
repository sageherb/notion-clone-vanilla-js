import "@/components/Editor/style.css";
import http from "@/api/documents";

export default async function Editor({ id }) {
  const section = document.querySelector("#section");
  section.innerHTML = /* html */ `
    <div class="document-detail">
      <h1 class="title" contenteditable="true" data-placeholder="새 페이지"></h1>
      <div class="content" contenteditable="true"></div>
    </div>`;

  const data = await http.get(id);
  const title = document.querySelector(".title");
  const content = document.querySelector(".content");
  title.innerText = data.title || "";
  content.innerText = data.content || "";

  const getBody = () => ({ title: title.innerText, content: content.innerText });
  const handleTitleKeyup = () => {
    http.update(id, getBody());
  };
  const handleTitleKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      content.innerText = "\n" + content.innerText;
      content.focus();
    }
  };

  title.addEventListener("keyup", handleTitleKeyup);
  title.addEventListener("keydown", handleTitleKeydown);
}
