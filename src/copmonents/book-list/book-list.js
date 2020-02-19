import React, {Component} from "react";
import BookListItem from "../book-list-item/book-list-item";
import { connect } from "react-redux";

import withBookstoreService from "../hoc/with-bookstore-service";
import {booksLoaded} from "../../actions";
import compose from "../../utils/compose";
import "./book-list.css";


class BookList extends Component {

    componentDidMount() {
    // 1. receive data
        const { bookstoreService } = this.props;
        const data = bookstoreService.getBooks();
    // 2. dispatch action to store
       this.props.booksLoaded(data);
    }

    render() {
        const { books } = this.props;
        return (
           <ul>
               {
                books.map((book) => {
                    return (
                        <li key={book.id}><BookListItem book={book} /></li>
                     )

                })
               }
           </ul>
          
        );
    }
};

const mapStateToProps = ({books}) => {
    return { books };
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, { booksLoaded })
)(BookList);

/*
export default withBookstoreService()(
    connect(mapStateToProps, { booksLoaded })(BookList));*/
