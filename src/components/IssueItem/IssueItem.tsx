import React from 'react';
import './IssueItem.scss';
import { format } from 'timeago.js';

interface Props {
  issue: Issue;
}

export const IssueItem: React.FC<Props> = React.memo(
  ({ issue }) => {

    return (
      <div className="issue-item">
        <p className="issue-item__title">{issue.title}</p>

        <p className="issue-item__date">
          #{issue.number} opened {format(issue.created_at, 'en_US')}
        </p>

        <p className="issue-item__info">{issue.user.type} | Comments: {issue.comments}</p>
      </div>
    )
  }
);