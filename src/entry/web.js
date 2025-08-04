import { ProjectDto } from "../adapter/ProjectDto.js";
import { MetadataDto } from "../adapter/MetadataDto.js";

const projects = [
  new ProjectDto(
    1,
    "elegant-starter-project",
    "some-link",
    new MetadataDto("This is elegant-starter-project.")
  ),
  new ProjectDto(
    2,
    "ghud-dev-tool",
    "some-link",
    new MetadataDto("This is ghud-dev-tool.")
  ),
  new ProjectDto(3, "ciiid", "some-link", new MetadataDto("This is ciiid.")),
  new ProjectDto(
    4,
    "fengsh-ui",
    "some-link",
    new MetadataDto("This is fengsh-ui.")
  ),
  new ProjectDto(5, "tandm", "some-link", new MetadataDto("This is tandm.")),
];

const projectsUl = () => document.querySelector("ul.gdt__projects");
const scopeUl = () => document.querySelector("ul.gdt__scope");
const data = (project) => {
  return project.name;
};

let li;
let button;
let span;

const remove = (event) => {
  const data = event.target.getAttribute("data-project");
  scopeUl().removeChild(
    Array.from(scopeUl().children).find(
      (li) => li.querySelector("span").textContent === data
    )
  );

  const scopedProjectNames = [];
  const scopedSpans = Array.from(scopeUl().querySelectorAll("span"));
  scopedSpans.forEach((span) => {
    scopedProjectNames.push(span.textContent);
  });

  const addLis = projectsUl().querySelectorAll("li");
  Array.from(addLis).forEach((li) => {
    if (!scopedProjectNames.includes(li.querySelector("span").textContent)) {
      li.querySelector("button").disabled = false;
    }
  });
};

const add = (event) => {
  const data = event.target.getAttribute("data-project");
  span = document.createElement("span");
  span.textContent = data;
  li = document.createElement("li");
  button = document.createElement("button");
  button.textContent = "Remove";
  button.setAttribute("data-project", data);
  button.addEventListener("click", remove);
  button.classList.add("gdt__remove-button");
  li.appendChild(button);
  li.appendChild(span);
  scopeUl().appendChild(li);

  const addButtons = () => document.querySelectorAll("button.gdt__add-button");
  const removeButtons = () =>
    document.querySelectorAll("button.gdt__remove-button");

  if (removeButtons().length >= 4) {
    addButtons().forEach((button) => (button.disabled = true));
  } else {
    Array.from(addButtons()).find(
      (button) => button.getAttribute("data-project") === data
    ).disabled = true;
  }
};

projects.forEach((project) => {
  span = document.createElement("span");
  span.textContent = data(project);
  li = document.createElement("li");
  button = document.createElement("button");
  button.textContent = "Scope";
  button.setAttribute("data-project", data(project));
  button.classList.add("gdt__add-button");
  button.addEventListener("click", add);
  li.appendChild(button);
  li.appendChild(span);
  projectsUl().appendChild(li);
});
