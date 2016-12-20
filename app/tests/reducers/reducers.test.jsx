const expect = require('expect');
const df = require('deep-freeze-strict');
const moment = require('moment');
const reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            const action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'Doge'
            };

            const res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });
    });

    describe('showCompletedReducer', () => {
        it('should flip the showCompleted status', () => {
            const action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            const expectingTrueResponse = reducers.showCompletedReducer(df(false), df(action));
            expect(expectingTrueResponse).toEqual(true);

            const expectingFalseResponse = reducers.showCompletedReducer(df(true), df(action));
            expect(expectingFalseResponse).toEqual(false);
        });
    });

    describe('todosReducer', () => {
        it('should add a new todo', () => {
            const action = {
                type: 'ADD_TODO',
                text: 'Take Doge'
            };

            const res = reducers.todosReducer(df([]), df(action));
            expect(res.length).toEqual(1);
            expect(res[0].text).toEqual(action.text);
        });

        it('should toggle todo', () => {
            const anExistingTodo = {
                id         : '123',
                text       : 'Take Doge',
                completed  : true,
                createdAt  : 123,
                completedAt: 125
            };

            const anAnotherExistingTodo = {
                id         : '124',
                text       : 'Take Another Doge',
                completed  : false,
                createdAt  : 128,
                completedAt: undefined
            };

            const todos = [anExistingTodo, anAnotherExistingTodo];

            const action = {
                type: 'TOGGLE_TODO',
                id: '123'
            };

            const res = reducers.todosReducer(df(todos), df(action));
            expect(res[0].completed).toEqual(false);
            expect(res[0].completedAt).toEqual(undefined);
        });
    });
});