export const searchTextReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_SEARCH_TEXT': {
            return action.searchText;
        }

        default: {
            return state;
        }
    }
};

export const showCompletedReducer = (state = false, action) => {
    switch(action.type) {
        case 'TOGGLE_SHOW_COMPLETED': {
            return !state;
        }

        default: {
            return state;
        }
    }
};

export const toggleTodoReducer = (state = false, action) => {
    switch(action.type) {
        case 'TOGGLE_TODO': {

        }

        default: {
            return state;
        }
    }
};