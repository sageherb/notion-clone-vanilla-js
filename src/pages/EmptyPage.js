import svg from "/public/assets/notion.svg?url";

export default function EmptyPage() {
  const section = document.querySelector("#section");
  section.innerHTML = `
    <div class="document-detail">
      <img class="document-detail-placeholder" src="${svg}" alt="Notion Icon">
    </div>`;
}
