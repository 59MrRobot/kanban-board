import React, { useEffect, useState } from 'react';
import './App.scss';
import { IssuesList } from './components/IssuesList';
import { getIssues, getRepo } from './redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Stack,
  TextField
} from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { updateCurrentIssue, updateHistory } from './redux/historyRedux';

const App: React.FC = () => {
  const [url, setUrl] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const dispatch = useDispatch();
  const repository: Repo = useSelector((state: State) => state.repo.repo);
  const issue: Issue = useSelector((state: State) => state.issue.issue);
  const history: any = useSelector((state: State) => state.history.history);
  const currentIssue: Issue = useSelector((state: State) => state.history.currentIssue);

  useEffect(() => {
    if (url) {
      setOwner(url.split('/')[url.split('/').length - 2]);
      setRepo(url.split('/')[url.split('/').length - 1]);
    }
  }, [url]);

  const handleClick = () => {
    getRepo(dispatch, owner, repo);
    getIssues(dispatch, owner, repo, url);
  };

  useEffect(() => {
    if (issue && !history.hasOwnProperty(issue.url)) {
      const todo = issue.issues.filter(issue => issue.state !== 'closed' && !issue.assignee);

      const inProgress = issue.issues.filter(issue => issue.state === 'open' && issue.assignee);

      const done = issue.issues.filter(issue => issue.state === 'closed');

      const columns = {
        todo: {
          id: 'todo',
          list: todo
        },
        inProgress: {
          id: 'inProgress',
          list: inProgress
        },
        done: {
          id: 'done',
          list: done
        }
      }

      dispatch(updateHistory({
        ...history,
        [issue.url]: {
          columns: columns,
          issues: issue.issues
        },
      }));

      dispatch(updateCurrentIssue({
        url: issue.url,
        issues: issue.issues,
        columns: columns
      }));
    }

    if (issue && history.hasOwnProperty(issue.url)) {
      dispatch(updateCurrentIssue({
        columns: history[issue.url].columns,
        issues: history[issue.url].issues,
        url: issue.url,
      }));
    }
  }, [dispatch, history, issue]);

  const roundStars = (stars: number) => {
    if (stars > 1000) {
      return `${Math.floor(stars / 1000)} K`;
    } else {
      return stars;
    }
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;

    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) return null;

    const start: Column = currentIssue.columns[source.droppableId as keyof Columns];
    const end: Column = currentIssue.columns[destination.droppableId as keyof Columns];

    if (start === end) {
      const newList = start.list.filter((_: any, idx: number) => idx !== source.index)

      newList.splice(destination.index, 0, start.list[source.index]);

      const newCol = {
        id: start.id,
        list: newList
      }

      dispatch(updateHistory({
        ...history,
        [currentIssue.url]: {
          issues: currentIssue.issues,
          columns : {
            ...currentIssue.columns,
            [newCol.id]: newCol,
          }
        },
      }))

      return null;
    } else {
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      )

      const newStartCol = {
        id: start.id,
        list: newStartList
      };

      const newEndList = [...end.list];

      newEndList.splice(destination.index, 0, start.list[source.index]);

      const newEndCol = {
        id: end.id,
        list: newEndList
      }

      dispatch(updateHistory({
        ...history,
        [currentIssue.url]: {
          issues: currentIssue.issues,
          columns : {
            ...currentIssue.columns,
            [newStartCol.id]: newStartCol,
            [newEndCol.id]: newEndCol
          }
        },
      }))

      return null;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          padding: "8px 0 8px",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
          }}
        >

          <Container
            maxWidth="xl"
            disableGutters
            sx={{
              display: "flex",
              gap: "16px",
            }}
          >
            <TextField
              id="outlined-controlled"
              label="Enter repo URL"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={(event) => setUrl(event.target.value)}
            />

            <Button
              variant="outlined"
              sx={{ whiteSpace: "nowrap" }}
              onClick={() => handleClick()}
            >
              Load issue
            </Button>
          </Container>

          {repository && (
            <Container
              maxWidth="xl"
              disableGutters
              sx={{
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "32px",
              }}
            >
              <p className="app__repo-info-name">
                <a
                  href="https://github.com/facebook"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit"}}
                >
                  {repository.owner.login}
                </a>
                {` > `}
                <a
                  href="https://github.com/facebook/react"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit"}}
                >
                  {repository.name}
                </a>
              </p>

              <p className="app__repo-info-stars">
                <img
                  src={`${process.env.PUBLIC_URL}/star.png`}
                  className="app__repo-info-image"
                  alt="star"
                />

                <span>{roundStars(repository.stargazers_count)} stars</span>
              </p>
            </Container>
          )}

          {currentIssue?.issues.length > 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              maxWidth="xl"
              sx={{ marginTop: "16px" }}
            >
              {Object.values(currentIssue?.columns).map(column => (
                <IssuesList column={column} key={column.id} />
              ))}
            </Stack>
          )}
        </Container>
      </Container>
    </DragDropContext>
  );
}

export default App;
