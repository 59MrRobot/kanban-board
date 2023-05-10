import { Octokit } from 'octokit';
import { config } from "../requestMethods";
import {
  startProcess,
  getIssuesSuccess,
  getIssuesFailure
} from "./issueRedux";
import { getRepoFailure, getRepoSuccess, startRepoProcess } from './repoRedux';

const octokit = new Octokit({ })

export const getRepo = async (dispatch, owner, repo) => {
  dispatch(startRepoProcess());

  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}`, config(owner, repo));

    dispatch(getRepoSuccess(response.data));
  } catch (error) {
    dispatch(getRepoFailure());
  }
}

export const getIssues = async (dispatch, owner, repo, url) => {
  dispatch(startProcess());

  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/issues`, config(owner, repo));

    dispatch(getIssuesSuccess({ issues: response.data, url }));
  } catch (error) {
    dispatch(getIssuesFailure());
    console.log(error);
  }
}