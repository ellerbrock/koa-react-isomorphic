// @flow
import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetchDataEnhancer from 'client/helpers/fetch-data-enhancer.jsx';
import TodosHeader from './todos-header';
import TodosAdd from './todos-add';
import TodosBody from './todos-body';
import TodosFooter from './todos-footer';
import { addTodo, removeTodo, completeTodo, fetchTodos } from './logic-bundle';
import type { Todo } from './types';

export const Todos = ({ todos, actions }: { todos: Todo[], actions: Object }) => (
  <div className="container">
    <div className="row">
      <TodosHeader />
      <TodosAdd addTodo={actions.addTodo} />
      <TodosBody
        todos={todos}
        removeTodo={actions.removeTodo}
        completeTodo={actions.completeTodo}
      />
      <TodosFooter />
    </div>
  </div>
);

Todos.propTypes = {
  todos: React.PropTypes.array,
  actions: React.PropTypes.object,
};

export const enhance = compose(
  fetchDataEnhancer(
    ({ store }) => store.dispatch(fetchTodos())
  ),
  connect(
    ({ todos }) => ({
      todos,
    }),
    dispatch => ({
      actions: bindActionCreators({
        addTodo,
        removeTodo,
        completeTodo,
      }, dispatch),
    })
  ),
  onlyUpdateForKeys(['todos'])
);

export default enhance(Todos);
