import React from 'react';
import './App.scss';

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

          <input type="submit" value="Load issues" />
        </form>

        <div className="app__repo-info">
          <p>{'Facebook > React'}</p>
          <p>194K stars</p>
        </div>

        <div className="app__repo-details">
          <div className="app__repo-section">
            <h2 className="app__repo-section-title">ToDo</h2>

            <div className="app__repo-section-content">
              <div className="app__repo-item">
                <p>Some issue title</p>

                <p>#315 opened 3 days ago</p>

                <p>Admin | Comments: 3</p>
              </div>

              <div className="app__repo-item">
                <p>Some issue title</p>

                <p>#315 opened 3 days ago</p>

                <p>Admin | Comments: 3</p>
              </div>

              <div className="app__repo-item">
                <p>Some issue title</p>

                <p>#315 opened 3 days ago</p>

                <p>Admin | Comments: 3</p>
              </div>
            </div>
          </div>

          <div className="app__repo-section">
            <h2 className="app__repo-section-title">In Progress</h2>

            <div className="app__repo-section-content">
              <div className="app__repo-item">
                <p>Some issue title</p>

                <p>#315 opened 3 days ago</p>

                <p>Admin | Comments: 3</p>
              </div>
            </div>
          </div>

          <div className="app__repo-section">
            <h2 className="app__repo-section-title">Done</h2>

            <div className="app__repo-section-content">
              <div className="app__repo-item">
                <p>Some issue title</p>

                <p>#315 opened 3 days ago</p>

                <p>Admin | Comments: 3</p>
              </div>

              <div className="app__repo-item">
                <p>Some issue title</p>

                <p>#315 opened 3 days ago</p>

                <p>Admin | Comments: 3</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
