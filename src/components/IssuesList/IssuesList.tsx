import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IssueItem } from '../IssueItem';
import './IssuesList.scss';

interface Props {
  title: string;
}

export const IssuesList: React.FC<Props> = React.memo(
  ({ title }) => {
    const issues: Issue[] = useSelector((state: any) => state.issue.issues);
    const [issuesList, setIssuesList] = useState<Issue[]>([]);

    useEffect(() => {
      if (title === 'ToDo') {
        setIssuesList(issues)
      }

      if (title === 'In Progress') {
        setIssuesList(issues.filter(issue => issue.state === 'open' && issue.assignee))
      }

      if (title === 'Done') {
        setIssuesList(issues.filter(issue => issue.state === 'closed'))
      }
    }, [issues, title]);

    return (
      <div className="issues-list">
        <h2 className="issues-list__title">{title}</h2>

        <div className="issues-list__content">
          {issuesList.map(issue => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    )
  }
);