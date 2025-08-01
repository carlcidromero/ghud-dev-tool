class ProjectDto {
  id;
  name;
  commitHistoryUrl;
  metadata;

  constructor(id, name, commitHistoryUrl, metadata) {
    this.id = id;
    this.name = name;
    this.commitHistoryUrl = commitHistoryUrl;
    this.metadata = metadata;
  }
}

class MetadataDto {
  description;

  constructor(description) {
    this.description = description;
  }
}

const projects = [
  new ProjectDto(1, "alpha", "some-link", new MetadataDto("This is alpha")),
  new ProjectDto(2, "bravo", "some-link", new MetadataDto("This is bravo.")),
  new ProjectDto(
    3,
    "charlie",
    "some-link",
    new MetadataDto("This is charlie.")
  ),
  new ProjectDto(4, "delta", "some-link", new MetadataDto("This is delta.")),
];

const projectsUl = document.querySelector("ul.gdt__projects");
const scopeUl = document.querySelector("ul.gdt__scope");
const data = (project) => {
  return project.name;
};

let li;
let button;
let span;

const remover = (event) => {
  const data = event.target.getAttribute("data-project");
  scopeUl.removeChild(
    Array.from(scopeUl.children).find(
      (li) => li.querySelector("span").textContent === data
    )
  );

  const buttons = document.querySelectorAll("button.gdt__add-button");
  Array.from(buttons).find(
    (button) => button.getAttribute("data-project") === data
  ).disabled = false;
};

const adder = (event) => {
  const data = event.target.getAttribute("data-project");
  span = document.createElement("span");
  span.textContent = data;
  li = document.createElement("li");
  button = document.createElement("button");
  button.textContent = "Remove";
  button.setAttribute("data-project", data);
  button.addEventListener("click", remover);
  button.classList.add("gdt__remove-button");
  li.appendChild(button);
  li.appendChild(span);
  scopeUl.appendChild(li);

  const buttons = document.querySelectorAll("button.gdt__add-button");
  Array.from(buttons).find(
    (button) => button.getAttribute("data-project") === data
  ).disabled = true;
};

projects.forEach((project) => {
  span = document.createElement("span");
  span.textContent = data(project);
  li = document.createElement("li");
  button = document.createElement("button");
  button.textContent = "Scope";
  button.setAttribute("data-project", data(project));
  button.classList.add("gdt__add-button");
  button.addEventListener("click", adder);
  li.appendChild(button);
  li.appendChild(span);
  projectsUl.appendChild(li);
});
