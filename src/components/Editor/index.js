import "./style.css";
import apiDocs from "../../api/documents";

export default async function Editor({ id }) {
  const section = document.querySelector("#section");
  section.innerHTML = "";

  const div = document.createElement("div");
  div.className = "document-detail";

  const title = document.createElement("h1");
  title.id = "title";
  title.setAttribute("contenteditable", "true");
  title.setAttribute("placeholder", "새 페이지");

  const contents = document.createElement("textarea");
  contents.id = "contents";

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

  const getBody = () => {
    const title = document.querySelector("#title").innerText;
    const contents = document.querySelector("#contents").value;

    return { title, content: contents };
  };

  const saveNow = async () => {
    try {
      const body = getBody();
      console.log(">>>>>>>>>>>>>>>", id, body);
      await apiDocs.update(id, body);
    } catch (err) {
      console.error("저장 실패:", err);
    }
  };

  title.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      contents.value = "\n" + contents.value;
      contents.focus();
      contents.setSelectionRange(0, 0);
    }
    setTimeout(saveNow, 0);
  });

  contents.addEventListener("keydown", () => {
    setTimeout(saveNow(id), 0);
  });
}
