import "./style.css";
import apiDocs from "../../api/documents";

export default async function Editor({ id }) {
  /* editor 기본 구조 생성 */
  const section = document.querySelector("#section");
  section.innerHTML = "";

  const div = document.createElement("div");
  div.className = "document-detail";

  // title과 contents를 각각의 div로 구성
  const title = document.createElement("h1");
  title.id = "title";
  title.setAttribute("contenteditable", "true");
  // title.setAttribute("data-placeholder", "새 페이지");

  const contents = document.createElement("textarea");
  contents.id = "contents";
  // contents.setAttribute("contenteditable", "true");
  // contents.setAttribute("data-placeholder", "내용을 입력하세요.");

  div.appendChild(title);
  div.appendChild(contents);
  section.appendChild(div);

  /* api */
  const docData = await apiDocs.get(id);

  // 텍스트 입력 가능, title/contents 내용이 없는 경우 포함
  if (docData.title === null || docData.title === undefined) {
    title.innerText = "새 페이지";
  } else {
    title.innerText = docData.title;
  }

  if (docData.content === null || docData.content === undefined) {
    contents.value = "내용을 입력하세요.";
  } else {
    contents.value = docData.content;
  }
}
