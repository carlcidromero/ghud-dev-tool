export class ProjectDto {
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
