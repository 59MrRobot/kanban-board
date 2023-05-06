/// <reference types="react-scripts" />

interface State {
  issue: {
    issue: Issue,
    isFetching: boolean,
    error: boolean,
  };
  repo: {
    repo: Repo,
    isFetching: boolean,
    error: boolean,
  };
  history: {
    history: any,
    currentIssue: Issue,
  };
}

interface Columns {
  todo: Column;
  inProgress: Column;
  done: Column;
}

interface Column {
  id: string;
  list: IssueItem[];
}

interface Repo {
  id: number;
  name: string;
  owner: {
    login: string;
  }
  stargazers_count: number;
}

interface Issue {
  issues: IssueItem[];
  url: string;
  columns: Columns;
}

interface IssueItem {
  id: number;
  assignee: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    type: string;
    site_admin: boolean;
  } | null;
  comments: number;
  created_at: string;
  destination: string;
  number: number;
  state?: string;
  title: string;
  user: {
    type: string;
  }
}
