import "./style.css";

// 테스트를 위한 더미 데이터
const TEST_DOCUMENTS = [
  {
    id: 1,
    title: "최상위 페이지",
    documents: [
      {
        id: 2,
        title: "하위 페이지 1",
        documents: [],
      },
    ],
  },
  {
    id: 4,
    title: "최상위 페이지 2",
    documents: [],
  },
];

const Sidebar = () => {
  /* 사이드바 기본 구조 생성 */
  // 사이드바 전체를 감싸는 aside 생성
  const sidebarEl = document.createElement("aside");
  sidebarEl.id = "sidebar";

  // 사이드바 헤더 영역
  const sidebarHeader = document.createElement("div");
  sidebarHeader.className = "sidebar-header";

  // 임시 새 페이지 만들기 버튼
  const addButton = document.createElement("button");
  addButton.className = "add-page-button";
  addButton.textContent = "새 페이지 만들기";
  sidebarHeader.appendChild(addButton);

  // 문서 목록을 담을 네비게이션 영역
  const documentListNav = document.createElement("nav");
  documentListNav.id = "document-list";

  /* 문서 트리 렌더링 */
  const renderDocuments = (parent, docs) => {
    const ul = document.createElement("ul");
    ul.className = "document-list";

    docs.forEach((doc) => {
      // DOM 구조 생성
      const li = document.createElement("li");
      li.className = "document-item";

      const pageInfo = document.createElement("div");
      pageInfo.className = "page-info";

      const pageTitle = document.createElement("span");
      pageTitle.textContent = doc.title;

      const toggleIconArea = document.createElement("span");
      toggleIconArea.className = "toggle-icon-area";

      // 하위 문서가 있으면 토글 버튼 생성
      if (doc.documents && doc.documents.length > 0) {
        const toggleButton = document.createElement("span");
        toggleButton.className = "toggle-button";
        toggleButton.textContent = "▶";
        toggleIconArea.appendChild(toggleButton);

        // 토글 버튼 클릭 이벤트 리스너
        toggleButton.addEventListener("click", (e) => {
          e.stopPropagation();
          const childUl = li.querySelector("ul");
          if (childUl) {
            childUl.classList.toggle("hidden");
            toggleButton.textContent = childUl.classList.contains("hidden") ? "▶" : "▼";
          }
        });
      }

      // <span>
      pageInfo.appendChild(toggleIconArea);
      pageInfo.appendChild(pageTitle);

      // <div>
      li.appendChild(pageInfo);

      // 하위 문서 있으면 기본으로 닫음 상태로 전환
      if (doc.documents && doc.documents.length > 0) {
        renderDocuments(li, doc.documents);
        li.querySelector("ul").classList.add("hidden");
      }

      // <li>
      ul.appendChild(li);
    });
    // <ui>
    parent.appendChild(ul);
  };

  renderDocuments(documentListNav, TEST_DOCUMENTS); // 재귀 호출, 하위 문서 있으면 렌더링

  /* 렌더링 결과물 추가 */
  sidebarEl.appendChild(sidebarHeader);
  sidebarEl.appendChild(documentListNav);

  // 생성된 aside 요소를 반환
  return sidebarEl;
};

export default Sidebar;
