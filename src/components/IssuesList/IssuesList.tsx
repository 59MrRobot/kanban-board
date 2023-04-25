import React from 'react';
import { IssueItem } from '../IssueItem';
import './IssuesList.scss';

interface Props {
  title: string;
}

export const IssuesList: React.FC<Props> = React.memo(
  ({ title }) => {
    return (
      <div className="issues-list">
        <h2 className="issues-list__title">{title}</h2>

        <div className="issues-list__content">
          <IssueItem />
          
          <IssueItem />
        </div>
      </div>
    )
  }
);