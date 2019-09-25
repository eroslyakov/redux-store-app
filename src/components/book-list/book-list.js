import React, { Component } from 'react';
import BookListItem from '../book-list-item/book-list-item';
import Spinner from '../spinner/spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withBookstoreService from '../hoc/with-bookstore-service';
import { fetchBooks, addBookToCart } from '../../actions/index';
import compose from '../../utils/compose';
import './book-list.css';
import ErrorIndicator from '../error-indicator/error-indicator';

const BookList = ({ books, onAddToCart }) => {
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem 
                                book={book} 
                                onAddToCart={() => onAddToCart(book.id)} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }
    
    render() {
        const { books, loading, error, onAddToCart } = this.props;

        if(loading) {
            return <Spinner />
        };

        if(error) {
            return <ErrorIndicator />
        };

        return <BookList books={books}
                         onAddToCart={onAddToCart} />
    }
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
    return {books, loading, error}
}

//providing our actions as object (not as function) in mDP means that
//store yourself will wrap our actions by bindActionCreators and will dispatch it to reducer
// const mapDispatchToProps = {
//     booksLoaded,
//     booksRequested,
//     bookFetchError
// }

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddToCart: addBookToCart
    }, dispatch);
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
