import "./style.css";
import apiDocs from "../../api/documents";

// 하단 새 페이지 추가 버튼 생성
const createAddPageButton = () => {
  const addPageButtonArea = document.createElement("div");
  addPageButtonArea.className = "bottom-add-page-area";
  const addPageButton = document.createElement("span");
  addPageButton.className = "bottom-add-page-button";
  addPageButton.textContent = "+";
  const addPageText = document.createElement("span");
  addPageText.className = "bottom-add-page-text";
  addPageText.textContent = "새 페이지 추가";

  addPageButtonArea.appendChild(addPageButton);
  addPageButtonArea.appendChild(addPageText);

  return addPageButtonArea;
};

// 개별 문서(li) 항목을 생성하는 함수
const createDocumentItem = (doc) => {
  const li = document.createElement("li"); // <li>
  li.className = "document-item";
  li.dataset.id = doc.id;

  const pageInfo = document.createElement("div");
  pageInfo.className = "page-info";

  // 좌측, 우측 토글 영역 생성
  const leftToggleArea = document.createElement("div");
  leftToggleArea.className = "left-toggle-area";
  const rightToggleArea = document.createElement("div");
  rightToggleArea.className = "right-toggle-area";

  // 페이지 제목 영역 생성
  const pageTitleArea = document.createElement("div");
  pageTitleArea.className = "page-title-area";

  // 페이지 제목 생성
  const pageLink = document.createElement("a");
  pageLink.href = `/documents/${doc.id}`;
  const pageTitle = document.createElement("span");
  pageTitle.className = "page-title";
  pageTitle.textContent = doc.title;
  pageLink.appendChild(pageTitle);
  pageTitleArea.appendChild(pageLink);

  // 버튼 요소 생성
  const toggleButton = document.createElement("span");
  toggleButton.className = "toggle-button";
  toggleButton.textContent = "▶";
  const deleteButton = document.createElement("span");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "🗑️";
  const addButton = document.createElement("span");
  addButton.className = "add-child-button";
  addButton.textContent = "+";

  leftToggleArea.appendChild(toggleButton);
  rightToggleArea.appendChild(deleteButton);
  rightToggleArea.appendChild(addButton);

  pageInfo.appendChild(leftToggleArea);
  pageInfo.appendChild(pageTitleArea);
  pageInfo.appendChild(rightToggleArea);
  li.appendChild(pageInfo); // </li>

  return li;
};

const Sidebar = async () => {
  /* 사이드바 기본 구조 생성 */
  // 사이드바 전체를 감싸는 aside 생성
  const sidebarEl = document.createElement("aside");
  sidebarEl.id = "sidebar";

  // 사이드바 헤더 영역
  const sidebarHeader = document.createElement("div");
  sidebarHeader.className = "sidebar-header";
  const userNameText = document.createElement("span");
  userNameText.textContent = `Update의 Notion`;
  userNameText.className = "user-name";

  // 문서 목록을 담을 네비게이션 영역
  const documentListNav = document.createElement("nav");
  documentListNav.id = "document-list";

  /* 문서 트리 렌더링 */
  const renderDocuments = (parent, docs) => {
    const ul = document.createElement("ul");
    ul.className = "document-list";

    docs.forEach((doc) => {
      const li = createDocumentItem(doc);
      // 하위 문서 있으면 재귀 호출
      if (doc.documents && doc.documents.length > 0) {
        renderDocuments(li, doc.documents);
        li.querySelector("ul").classList.add("hidden");
      }

      ul.appendChild(li);
    });
    parent.appendChild(ul);
  };
  // API 호출 및 렌더링
  const documents = await apiDocs.getList();
  console.log(documents);
  renderDocuments(documentListNav, documents); // 재귀 호출, 하위 문서 있으면 렌더링

  // 모든 문서의 최하단에 [새 페이지 추가] 버튼
  const BottomAddPageButton = createAddPageButton();
  documentListNav.appendChild(BottomAddPageButton);

  /* 렌더링 결과물 추가 */
  sidebarHeader.appendChild(userNameText);
  sidebarEl.appendChild(sidebarHeader);
  sidebarEl.appendChild(documentListNav);

  // 이벤트리스너(이벤트 위임)
  sidebarEl.addEventListener("click", async (e) => {
    const target = e.target;
    // 접기/펴기 토글 버튼
    if (target.classList.contains("toggle-button")) {
      const parentLi = target.closest(".document-item");
      const childDocs = parentLi.querySelector("ul");

      if (childDocs) {
        childDocs.classList.toggle("hidden");
        target.textContent = childDocs.classList.contains("hidden") ? "▶" : "▼";
      } else {
        // 하위 페이지가 없는 경우 처리 (토글 시 '하위 페이지 없음' 텍스트)
        const noPagesText = parentLi.querySelector(".no-pages-text");
        if (noPagesText) {
          parentLi.removeChild(noPagesText);
          target.textContent = "▶";
        } else {
          const newNoPagesText = document.createElement("span");
          newNoPagesText.className = "no-pages-text";
          newNoPagesText.textContent = "하위 페이지 없음";
          parentLi.appendChild(newNoPagesText);
          target.textContent = "▼";
        }
      }
    }
    // '+' 버튼 클릭
    else if (target.classList.contains("add-child-button")) {
      const parentLi = target.closest(".document-item");
      const parentId = parentLi ? parentLi.dataset.id : null;
      try {
        await apiDocs.create({ parent: parentId });
        const updatedDocuments = await apiDocs.getList();

        // 기존 문서 목록을 비우고 새로운 문서 목록으로 다시 렌더링
        const documentListNav = document.getElementById("document-list");
        documentListNav.innerHTML = "";
        renderDocuments(documentListNav, updatedDocuments);
        // 모든 문서 최하단에 [새 페이지 추가] 버튼
        documentListNav.appendChild(BottomAddPageButton);

        // 하위 문서가 보이도록 ul 태그의 hidden 클래스 제거
        let currentLi = documentListNav.querySelector(`[data-id="${parentId}"]`);
        if (currentLi) {
          // 부모 문서부터 상위 노드까지 순회하며 hidden 클래스 제거
          while (currentLi && currentLi.classList.contains("document-item")) {
            const childDocsUl = currentLi.querySelector("ul");
            if (childDocsUl) {
              childDocsUl.classList.remove("hidden");
              const toggleButton = currentLi.querySelector(".toggle-button");
              if (toggleButton) {
                toggleButton.textContent = "▼";
              }
            }

            // 다음 부모 문서로 이동
            const parentUl = currentLi.parentElement;
            if (parentUl && parentUl.classList.contains("document-list")) {
              currentLi = parentUl.closest(".document-item");
            } else {
              currentLi = null;
            }
          }
        }
      } catch (error) {
        console.error("문서 생성 중 오류", error);
      }
    }
    // '휴지통' 버튼 클릭
    else if (target.classList.contains("delete-button")) {
      const parentLi = target.closest(".document-item");
      const documentId = parentLi ? parentLi.dataset.id : null;
      if (documentId) {
        try {
          await apiDocs.del(documentId);
          parentLi.remove();
        } catch (error) {
          console.error("문서 삭제 중 오류 발생:", error);
        }
      }
    }
    // 최하단 '새 페이지 추가' 버튼 클릭
    else if (target.closest(".bottom-add-page-area")) {
      try {
        await apiDocs.create({});
        const updatedDocuments = await apiDocs.getList(); // 기존 문서 목록을 비우고 새로운 문서 목록으로 다시 렌더링

        const documentListNav = document.getElementById("document-list");
        documentListNav.innerHTML = "";
        renderDocuments(documentListNav, updatedDocuments);
        documentListNav.appendChild(BottomAddPageButton);
      } catch (error) {
        console.error("루트 문서 생성 중 오류 발생:", error);
      }
    }
  });

  // 생성된 aside 요소를 반환
  return sidebarEl;
};

export default Sidebar;
