import React, {Component} from "react";
import BookListItem from "../book-list-item/book-list-item";
import { connect } from "react-redux";

import withBookstoreService from "../hoc/with-bookstore-service";
import {booksLoaded, booksRequested} from "../../actions";
import compose from "../../utils/compose";
import "./book-list.css";
import Spinner from "../spinner/spinner";


class BookList extends Component {

    componentDidMount() {
    // 1. receive data
        const { bookstoreService, booksLoaded, booksRequested } = this.props;
        booksRequested();
        bookstoreService.getBooks()
            .then((data) => {
                // 2. dispatch action to store
                booksLoaded(data);
            });
    }

    render() {
        const { books, loading } = this.props;

        return  loading
            ? <Spinner/>
            : <ul className="book-list">
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}><BookListItem book={book} /></li>
                        )

                    })
                }
            </ul>
    }
};

const mapStateToProps = ({books, loading}) => {
    return { books, loading };
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, { booksLoaded, booksRequested })
)(BookList);

/*
export default withBookstoreService()(
    connect(mapStateToProps, { booksLoaded })(BookList));*/
