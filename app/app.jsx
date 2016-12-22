const React = require('react');
const ReactDOM = require('react-dom');
const {Route, Router, IndexRoute, hashHistory} = require('react-router');

const Main = require('Main');
const TodoApp = require('TodoApp');

const actions = require('actions');
const store = require('configureStore').configure();

store.subscribe(() => {
    console.log('New state: ', store.getState());
});

store.dispatch(actions.addTodo('Clean the yard'));
store.dispatch(actions.setSearchText('yard'));
store.dispatch(actions.showCompleted());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    // <Router history={hashHistory}>
    //     <Route path="/" component={Main}>
    //         {/*<Route path="about" component={About}/>*/}
    //         <IndexRoute component={TodoApp}/>
    //     </Route>
    // </Router>,
    <TodoApp/>,
    document.getElementById('app')
);
