const fetchBooksRequest = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
};

const fetchBooksSuccess = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
};

const fetchBooksFailure = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
};

// const fetchBooksOld = (bookstoreService, dispatch) => () => {
//     dispatch(fetchBooksRequest());
//     bookstoreService.getBooks()
//         .then(data => dispatch(fetchBooksSuccess(data)))
//         .catch(err => dispatch(fetchBooksFailure(err)));
// };

const fetchBooks = bookstoreService => () => dispatch => {
    dispatch(fetchBooksRequest());
    bookstoreService.getBooks()
        .then(data => dispatch(fetchBooksSuccess(data)))
        .catch(err => dispatch(fetchBooksFailure(err)));
}

const addBookToCart = (bookId) => {
    return {
        type: 'ADD_BOOK_TO_CART',
        payload: bookId
    }
};

const deleteBookFromCart = (bookId) => {
    return {
        type: 'DELETE_BOOK_FROM_CART',
        payload: bookId
    }
};

const deleteItemFromCart = (bookId) => {
    return {
        type: 'DELETE_ITEM_FROM_CART',
        payload: bookId
    }
};

export {
    fetchBooks,
    addBookToCart,
    deleteBookFromCart,
    deleteItemFromCart
};