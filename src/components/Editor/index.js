import "./style.css";

// 테스트를 위한 더미 데이터
const TEST_DOCUMENTS = [
  {
    id: 1,
    title: "최상위 페이지",
    content: "내용입니다",
    documents: [
      {
        id: 2,
        title: "하위 페이지 1",
        content: "내용입니다 1",
        documents: [],
      },
    ],
  },
  {
    id: 4,
    title: "최상위 페이지 2",
    content: "내용입니다 2",
    documents: [],
  },
];

export default function Editor() {
  /* editor 기본 구조 생성 */
  const section = document.createElement("section");
  section.id = "section";
  // title과 contents를 각각의 div로 구성
  const title = document.createElement("div");
  const contents = document.createElement("div");
  title.id = "title";
  contents.id = "contents";

  section.appendChild(title);
  section.appendChild(contents);

  /* url 에서 id 가져오기 */
  //const id = window.location.pathname.split("/")[2];
  // test용
  const id = "1";

  /* 문서 내용 렌더링 */
  // 가져온 id를 통해 데이터를 탐색
  const testData = TEST_DOCUMENTS.find((doc) => doc.id === Number(id));

  // 텍스트 입력 가능, title/contents 내용이 없는 경우 포함
  const titleText = document.createElement("textarea");
  titleText.id = "titleText";
  if (testData?.title !== null) titleText.value = testData.title;
  else if (testData?.title === null) titleText.value = "새 페이지";

  const contentsText = document.createElement("textarea");
  contentsText.id = "contentsText";
  if (testData.content !== null) contentsText.value = testData.content;
  else if (testData.content === null) contentsText.value = "내용을 입력하세요.";

  title.appendChild(titleText);
  contents.appendChild(contentsText);

  // main 안에 들어갈 section을 만들고, 그 안에 에디터 요소를 만들어 최종 반환
  return section;
}
