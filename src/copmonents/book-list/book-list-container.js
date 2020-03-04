import React, {Component} from "react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import withBookstoreService from "../hoc/with-bookstore-service";
import {fetchBooks, bookAddedToCart} from "../../actions";
import compose from "../../utils/compose";
import "./book-list.css";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";
import BookList from "./book-list";


class BookListContainer extends Component {

    componentDidMount() {
       this.props.fetchBooks();
    }

    render() {

        const { books, loading, error, onAddedToCart} = this.props;
        if (loading) return <Spinner/>
        if (error) return <ErrorIndicator/>
        return <BookList books={books} onAddedToCart={onAddedToCart} />
    }
};

const mapStateToProps = ({ bookList:{books, loading, error} }) => {
    return { books, loading, error };
};
const mapDispatchToProps = (dispatch, {bookstoreService}) => {

   return bindActionCreators ({
       // fetchBooks: fetchBooks(bookstoreService, dispatch),
       fetchBooks: fetchBooks(bookstoreService),
       onAddedToCart: bookAddedToCart
   }, dispatch);
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);

