export class ProjectDto {
  id;
  name;
  owner;
  metadata;

  constructor(id, name, owner, metadata) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.metadata = metadata;
  }
}
