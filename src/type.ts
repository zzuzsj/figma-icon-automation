export interface IGitData {
  id: string;
  url: string;
  page: string;
  token?: string;
  manager?: string;
  managerId?: string;
}
export interface IPageItem {
  id: string;
  name: string;
  is_active: boolean;
}

export const PluginGitDataKey = `root-git-data`;
export const PluginGitTokenKey = `page-git-token`;
