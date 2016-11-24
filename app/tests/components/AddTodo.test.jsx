const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

const AddTodo = require('AddTodo');

describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should call onAddTodo prop with valid data', () => {
        const spy = expect.createSpy();
        const addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        const $el = $(ReactDOM.findDOMNode(addTodo));


        const todoText = 'Check mail';
        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(todoText);
    });

    it('should not call onAddTodo prop with invalid data', () => {
        const spy = expect.createSpy();
        const addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        const $el = $(ReactDOM.findDOMNode(addTodo));


        const todoText = '';
        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});
