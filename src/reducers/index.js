export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const BOOK_ADDED_TO_CART = 'BOOK_ADDED_TO_CART';
export const BOOK_DELETED_IN_CART = 'BOOK_DELETED_IN_CART';
export const ALL_BOOK_DELETED_IN_CART = 'ALL_BOOK_DELETED_IN_CART';

const initialState = {
   books: [],
   loading: true,
   error: null,
   cartItems: [],
   orderTotal: 220
};

const updateCartItems = (cartItems, item, idx) => {
    if (item.count === 0) {
        return [
            ...cartItems.filter(item => item.id === idx)
        ]
    }
    if (idx === -1) {
        return [
            ...cartItems,
            item
        ];
    }
    return [
        ...cartItems.filter( item => item.id === idx ),
        item
    ];
};

const updateCartItem = (book, item = {}, quantity) => {
    
    const {
        id = book.id,
        count = 0,
        title = book.title,
        total = 0
    } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity*book.price
    };

};
const updateOrder = (state, bookId, quantity) => {
    const {books, cartItems} = state;
    const book = books.find(({id}) => id === bookId);
    const itemIndex = cartItems.findIndex(({id}) => id === bookId);
    const item = cartItems[itemIndex];

    const newItem = updateCartItem(book, item, quantity);

    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };
}

const reducer = (state = initialState, action) => {
   debugger;
    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
           return {
               ...state,
               books: state.books,
               loading: true,
               error: null
           };

        case FETCH_BOOKS_SUCCESS :
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };

        case FETCH_BOOKS_FAILURE :
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            }

        case BOOK_ADDED_TO_CART :
           return updateOrder(state, action.payload, 1)

        case BOOK_DELETED_IN_CART :
           return  updateOrder(state, action.payload, -1)

        case ALL_BOOK_DELETED_IN_CART :
           const item = state.cartItems.find( ({ id }) => id === action.payload);
           return updateOrder(state, action.payload, -item.count);
            
        default:
            return state;
    }
};

export default reducer;
