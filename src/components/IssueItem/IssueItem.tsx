import React from 'react';
import './IssueItem.scss';

export const IssueItem: React.FC = React.memo(
  () => {
    return (
      <div className="issue-item">
        <p className="issue-item__title">Some issue title</p>

        <p className="issue-item__date">#315 opened 3 days ago</p>

        <p className="issue-item__info">Admin | Comments: 3</p>
      </div>
    )
  }
);