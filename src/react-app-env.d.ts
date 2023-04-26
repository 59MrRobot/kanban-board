/// <reference types="react-scripts" />

interface Repo {
  id: number;
  name: string;
  owner: {
    login: string;
  }
  stargazers_count: number;
}

interface Issue {
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
  number: number;
  state: string;
  title: string;
  user: {
    type: string;
  }
}
