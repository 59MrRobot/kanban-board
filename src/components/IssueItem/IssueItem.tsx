import React from 'react';
import { format } from 'timeago.js';
import { Card, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  issue: IssueItem;
  index: number;
}

export const IssueItem: React.FC<Props> = React.memo(
  ({ issue, index }) => {

    return (
      <Draggable draggableId={String(issue.id)} index={index}>
        {provided => (
          <Card
            sx={{
              padding: "16px",
              maxWidth: "100%",
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              border: "1px solid black",
              borderRadius: "24px",
              backgroundColor: "#fff",
              fontWeight: 500,
              cursor: "pointer",
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Typography
              component="h3"
              sx={{
                fontFamily: "'Source Code Pro', monospace",
                fontWeight: 500
              }}
            >{issue.title}</Typography>

            <Typography
              component="p"
              sx={{
                fontFamily: "'Source Code Pro', monospace",
                fontWeight: 500,
                color: "grey",
              }}
            >
              #{issue.number} opened {format(issue.created_at, 'en_US')}
            </Typography>

            <Typography
              component="p"
              sx={{
                fontFamily: "'Source Code Pro', monospace",
                fontWeight: 500,
                color: "grey",
              }}
            >
              {issue.user.type} | Comments: {issue.comments}
            </Typography>
          </Card>
        )}
      </Draggable>
    )
  }
);