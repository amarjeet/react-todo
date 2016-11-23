const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

const TodoList = require('TodoList');
const Todo = require('Todo');

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each todo item', () => {
        const todos = [
            {
                id: 1,
                text: 'Do something please!'
            },
            {
                id: 2,
                text: 'Check mail'
            }
        ];

        const todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        const todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
        expect(todosComponents.length).toBe(todos.length);
    });
});
