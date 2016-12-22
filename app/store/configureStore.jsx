const redux = require('redux');
const {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');

export const configure = () => {
    const reducer = redux.combineReducers({
        searchText   : searchTextReducer,
        showCompleted: showCompletedReducer,
        todos        : todosReducer
    });

    // const store = redux.createStore(reducer, redux.compose(window.devToolsExtention ? window.devToolsExtension() : f => f));
    const store = redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
};