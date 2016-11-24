const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

const TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
    it('should exist', () => {
        expect(TodoSearch).toExist();
    });

    it('should call onSearch with entered input text', () => {
        const spy = expect.createSpy();
        const todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
        const $el = $(ReactDOM.findDOMNode(todoSearch));

        const searchText = 'Dog';
        todoSearch.refs.searchText.value = searchText;
        TestUtils.Simulate.change(todoSearch.refs.searchText);

        expect(spy).toHaveBeenCalledWith(false, 'Dog');
    });

    it('should call onSearch with proper checked value', () => {
        const spy = expect.createSpy();
        const todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
        const $el = $(ReactDOM.findDOMNode(todoSearch));

        todoSearch.refs.showCompleted.checked = true;
        TestUtils.Simulate.change(todoSearch.refs.searchText);

        expect(spy).toHaveBeenCalledWith(true, '');
    });
});
