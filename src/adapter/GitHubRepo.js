import { IGitHubRepo } from "../port/IGitHubRepo.js";

export class GitHubRepo extends IGitHubRepo {
  #owner;
  #name;

  constructor(owner, name) {
    super();
    this.#owner = owner;
    this.#name = name;
  }

  async commits() {
    const response = await fetch(
      `https://api.github.com/repos/${this.#owner}/${this.#name}/commits`
    );

    return await response.json();
  }

  name() {
    return this.#name;
  }
}
