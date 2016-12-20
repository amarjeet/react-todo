const expect = require('expect');
const df = require('deep-freeze-strict');
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
});