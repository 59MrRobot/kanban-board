import React from 'react';
import './App.scss';
import { IssueItem } from './components/IssueItem';
import { IssuesList } from './components/IssuesList';

const App: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <div className="app">
      <div className="app__wrapper">
        <form className="app__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter repo URL"
            className="app__input"
          />

          <input
            type="submit"
            value="Load issues"
            className="app__button"
          />
        </form>

        <div className="app__repo-info">
          <p className="app__repo-info-name">{'Facebook > React'}</p>

          <p className="app__repo-info-stars">
            <img
              src={`${process.env.PUBLIC_URL}/star.png`}
              className="app__repo-info-image"
              alt="star"
            />

            <span>194 K stars</span>
          </p>
        </div>

        <div className="app__repo-details">
          <div className="app__repo-section">
            <h2 className="app__repo-section-title">ToDo</h2>

            <div className="app__repo-section-content">
              <IssueItem />

              <IssueItem />

              <IssueItem />
            </div>
          </div>

          <div className="app__repo-section">
            <h2 className="app__repo-section-title">In Progress</h2>

            <div className="app__repo-section-content">
              <IssueItem />
            </div>
          </div>

          <IssuesList title="Done" />
        </div>

      </div>
    </div>
  );
}

export default App;
