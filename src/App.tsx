import React, { useEffect, useState } from 'react';
import './App.scss';
import { IssueItem } from './components/IssueItem';
import { IssuesList } from './components/IssuesList';
import { getIssues, getRepo } from './redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const App: React.FC = () => {
  const [url, setUrl] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const dispatch = useDispatch();
  const repository: Repo = useSelector((state: any) => state.repo.repo);

  useEffect(() => {
    if (url) {
      setOwner(url.split('/')[url.split('/').length - 2]);
      setRepo(url.split('/')[url.split('/').length - 1]);
    }
  }, [url]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    getRepo(dispatch, owner, repo);
    getIssues(dispatch, owner, repo);
  };

  const roundStars = (stars: number) => {
    if (stars > 1000) {
      return `${Math.floor(stars / 1000)} K`;
    } else {
      return stars;
    }
  }

  return (
    <div className="app">
      <div className="app__wrapper">
        <form className="app__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter repo URL"
            className="app__input"
            onChange={(event) => setUrl(event.target.value)}
          />

          <input
            type="submit"
            value="Load issues"
            className="app__button"
          />
        </form>

        {repository && (
          <div className="app__repo-info">
            <p className="app__repo-info-name">
              {`${repository.owner.login} > ${repository.name}`}
            </p>

            <p className="app__repo-info-stars">
              <img
                src={`${process.env.PUBLIC_URL}/star.png`}
                className="app__repo-info-image"
                alt="star"
              />

              <span>{roundStars(repository.stargazers_count)} stars</span>
            </p>
          </div>
        )}

        <div className="app__repo-details">
          <IssuesList title="ToDo" />

          <IssuesList title="In Progress" />

          <IssuesList title="Done" />
        </div>

      </div>
    </div>
  );
}

export default App;
