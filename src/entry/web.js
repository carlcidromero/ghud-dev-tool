import { ProjectDto } from "../adapter/ProjectDto.js";
import { MetadataDto } from "../adapter/MetadataDto.js";
import { GitHubRepo } from "../adapter/GitHubRepo.js";

const projects = [
  new ProjectDto(
    1,
    "elegant-starter-project",
    "carlcidromero",
    new MetadataDto("This is elegant-starter-project.")
  ),
  new ProjectDto(
    2,
    "ghud-dev-tool",
    "carlcidromero",
    new MetadataDto("This is ghud-dev-tool.")
  ),
  new ProjectDto(3, "ciiid", "some-link", new MetadataDto("This is ciiid.")),
  new ProjectDto(
    4,
    "fengsh-ui",
    "carlcidromero",
    new MetadataDto("This is fengsh-ui.")
  ),
  new ProjectDto(
    5,
    "tandm",
    "carlcidromero",
    new MetadataDto("This is tandm.")
  ),
];

const repos = projects.map((project) => {
  return new GitHubRepo(project.owner, project.name);
});

repos.forEach(async (repo) => {
  console.log(await repo.commits());
});

const projectsUl = () => document.querySelector("ul.gdt__projects");
const scopeUl = () => document.querySelector("ul.gdt__scope");
const data = (project) => {
  return project.name;
};

let li;
let button;
let projectNameSpan;
let commitCountSpan;

const remove = (event) => {
  const data = event.target.getAttribute("data-project");
  scopeUl().removeChild(
    Array.from(scopeUl().children).find(
      (li) =>
        li.querySelector("span.gdt__scoped-project-name").textContent === data
    )
  );

  const scopedProjectNames = [];
  const scopedSpans = Array.from(
    scopeUl().querySelectorAll("span.gdt__scoped-project-name")
  );
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
  commitCountSpan = document.createElement("span");
  commitCountSpan.classList.add("gdt__commit-count-span");

  const targetRepo = repos.find((repo) => repo.name() === data);
  (async () => {
    const commits = await targetRepo.commits();
    commitCountSpan.textContent = commits.length ? commits.length : 0;
  })();

  projectNameSpan = document.createElement("span");
  projectNameSpan.classList.add("gdt__scoped-project-name");
  projectNameSpan.textContent = data;
  li = document.createElement("li");
  button = document.createElement("button");
  button.textContent = "Remove";
  button.setAttribute("data-project", data);
  button.addEventListener("click", remove);
  button.classList.add("gdt__remove-button");
  li.appendChild(button);
  li.appendChild(commitCountSpan);
  li.appendChild(projectNameSpan);
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
  projectNameSpan = document.createElement("span");
  projectNameSpan.textContent = data(project);
  li = document.createElement("li");
  button = document.createElement("button");
  button.textContent = "Scope";
  button.setAttribute("data-project", data(project));
  button.classList.add("gdt__add-button");
  button.addEventListener("click", add);
  li.appendChild(button);
  li.appendChild(projectNameSpan);
  projectsUl().appendChild(li);
});
