export let setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export let addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        text
    };
};

export let toggleShowCompleted = (showCompleted) => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export let toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};

// let exported = {};
//
// function generateAction(type, propName) {
//     let action = {};
//     action.type = type;
//     action[propName] = propName;
//     return action;
// }
//
// let actions = [
//     {actionFunction: 'setSearchText', type: 'SET_SEARCH_TEXT', propName: ['searchText']},
//     {actionFunction: 'addTodo', type: 'ADD_TODO', propName: ['text']},
//     {actionFunction: 'toggleShowCompleted', type: 'TOGGLE_SHOW_COMPLETED', propName: ['showCompleted']},
//     {actionFunction: 'toggleTodo', type: 'TOGGLE_TODO', propName: ['completed']},
// ];
//
// actions.forEach((action) => {
//     exported[action.actionFunction] = (...propArguments) => {
//         let toReturn = {};
//         toReturn.type = action.type;
//         console.log(propArguments);
//         propArguments.forEach((propName) => {
//             toReturn[propName] = propName;
//         });
//         // toReturn[action.propName] = propArgument;
//         return toReturn;
//     };
// });
//
// module.exports = exported;