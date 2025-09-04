import "./style.css";
import apiDocs from "../../api/documents";

export default async function Editor({ id }) {
  /* editor 기본 구조 생성 */
  const section = document.querySelector("#section");
  // title과 contents를 각각의 div로 구성
  const title = document.createElement("div");
  const contents = document.createElement("div");
  title.id = "title";
  contents.id = "contents";

  section.appendChild(title);
  section.appendChild(contents);

  /* api */
  const docData = await apiDocs.get(id);

  /* 문서 내용 렌더링 */
  // 텍스트 입력 가능
  const titleText = document.createElement("textarea");
  titleText.id = "titleText";
  const contentsText = document.createElement("textarea");
  contentsText.id = "contentsText";

  if (docData.title === null || docData.title === undefined) titleText.value = "새 페이지";
  else titleText.value = docData.title;
  if (docData.content === null || docData.content === undefined)
    contentsText.value = "내용을 입력하세요.";
  else contentsText.value = docData.content;

  title.appendChild(titleText);
  contents.appendChild(contentsText);

  /* 문서 생성 */
}
