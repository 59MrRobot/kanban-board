import { Octokit } from 'octokit';
import { config } from "../requestMethods";
import {
  startProcess,
  getIssuesSuccess,
  getIssuesFailure
} from "./issueRedux";
import { getRepoFailure, getRepoSuccess, startRepoProcess } from './repoRedux';

const octokit = new Octokit({
  auth: `${process.env.REACT_APP_TOKEN}`,
})

export const getRepo = async (dispatch, owner, repo) => {
  dispatch(startRepoProcess());

  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}`, config(owner, repo));

    dispatch(getRepoSuccess(response.data));
  } catch (error) {
    dispatch(getRepoFailure());
  }
}

export const getIssues = async (dispatch, owner, repo) => {
  dispatch(startProcess());

  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/issues`, config(owner, repo));

    dispatch(getIssuesSuccess(response.data));
  } catch (error) {
    dispatch(getIssuesFailure());
    console.log(error);
  }
}