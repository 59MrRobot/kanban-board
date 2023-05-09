import { Box, Typography } from '@mui/material';
import React from 'react';
import { IssueItem } from '../IssueItem';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  column: Column;
}

export const IssuesList: React.FC<Props> = React.memo(
  ({ column }) => {

    return (
      <Box sx={{ width: "100%" }}>
        <Typography
          variant='h2'
          sx={{
            fontFamily: "'Source Code Pro', monospace",
            fontWeight: 400,
            fontSize: "32px",
            textAlign: "center",
          }}
        >
          {column.id === 'todo' ? 'ToDo' : column.id === 'inProgress' ? 'In Progress' : 'Done'}
        </Typography>

        <Droppable droppableId={column.id}>
          {provided => (
            <Box
              sx={{
                marginTop: "24px",
                padding: "16px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                backgroundColor: "lightgray",
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {column.list.map((issue, index) => (
                <IssueItem key={issue.id} issue={issue} index={index} />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    )
  }
);