import svg from "/public/assets/notion.svg?url";

export default function EmptyPage() {
  const section = document.querySelector("#section");
  section.innerHTML = `
    <div class="note-detail">
      <img class="note-detail-placeholder" src="${svg}" alt="Notion Icon">
    </div>`;
}
