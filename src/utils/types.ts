export interface Repo {
  [key: string]: string | undefined;
}

export interface Branch {
  name: string;
}

export interface BranchInfo {
  branchName: string;
  vercelLink: string | null;
}

export interface VercelBranch {
  branch: string;
  url: string;
}
export interface VercelDeploymentResponse {
  deployments: Deployment[];
  pagination: Pagination;
}

interface Deployment {
  uid: string;
  name: string;
  url: string;
  created: number;
  source: string;
  state: string;
  readyState: string;
  readySubstate: string;
  type: string;
  creator: Creator;
  inspectorUrl: string;
  meta: Meta;
  target: string | null;
  aliasError: null;
  aliasAssigned: number;
  isRollbackCandidate: boolean;
  createdAt: number;
  buildingAt: number;
  ready: number;
  projectSettings: ProjectSettings;
}

interface Creator {
  uid: string;
  email: string;
  username: string;
  githubLogin: string;
}

interface Meta {
  githubCommitAuthorName: string;
  githubCommitMessage: string;
  githubCommitOrg: string;
  githubCommitRef: string;
  githubCommitRepo: string;
  githubCommitSha: string;
  githubDeployment: string;
  githubOrg: string;
  githubRepo: string;
  githubRepoOwnerType: string;
  githubCommitRepoId: string;
  githubRepoId: string;
  githubRepoVisibility: string;
  githubCommitAuthorLogin: string;
  branchAlias: string;
}

interface ProjectSettings {
  commandForIgnoringBuildStep: null;
}

interface Pagination {
  count: number;
  next: number;
  prev: number;
}
