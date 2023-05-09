import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { IssueItem } from './IssueItem';
import { store } from '../../redux/store';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const onDragEnd = () => null;

test('Issue item renders correctly with props', () => {
  const issue = {
    id: 123,
    assignee: null,
    comments: 0,
    created_at: "2021-12-03",
    number: 231,
    state: "open",
    title: "Test",
    user: {
      type: 'User',
    }
  }

  render(
    <Provider store={store}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='todo'>
          {provided => (
            <IssueItem issue={issue} index={0} />
          )}
        </Droppable>
      </DragDropContext>
    </Provider>
  );
  const textElement = screen.getByText('Test');
  expect(textElement).toBeInTheDocument();
})