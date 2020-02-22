const BOOKS_LOADED = 'BOOKS_LOADED';
const BOOKS_REQUESTED = 'BOOKS_REQUESTED';

const initialState = {
    books: [],
    loading: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKS_REQUESTED: {
           return {
               books: state.books,
               loading: true
           };
        }
        case BOOKS_LOADED :
            return {
                books: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
