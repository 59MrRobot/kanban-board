import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { IssuesList } from './IssuesList';
import { store } from '../../redux/store';
import { DragDropContext } from 'react-beautiful-dnd';

const onDragEnd = () => null;

test('Issues list renders correctly with props', () => {
  const column = {
    id: 'todo',
    list: [],
  }

  render(
    <Provider store={store}>
      <DragDropContext onDragEnd={onDragEnd}>
        <IssuesList column={column} />
      </DragDropContext>
    </Provider>
  );
  const textElement = screen.getByText('ToDo');
  expect(textElement).toBeInTheDocument();
})