import { AbstractMethodError } from "../adapter/AbstractMethodError.js";

export class IGitHubRepo {
  commits() {
    throw new AbstractMethodError("commits");
  }

  name() {
    throw new AbstractMethodError("name");
  }
}
