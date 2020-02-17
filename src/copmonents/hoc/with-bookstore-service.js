import React from "react";
import {BookstoreServiceConsumer} from "../bookstore-service-contex/bookstore-servise-context";

const withBookstoreService = () => (Wrapped) =>  {

    return (props) => {
        return  (
            <BookstoreServiceConsumer>
                {
                    (bookstoreService) => {
                        return <Wrapped {...props} bookstoreService={bookstoreService} />
                    }
                }
            </BookstoreServiceConsumer>
        )
    };
}


export default withBookstoreService;