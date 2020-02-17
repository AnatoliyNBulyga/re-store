import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import ErrorBoundry from "./copmonents/error-boundry/error-boundry";
import BookstoreService from "./services/bookstore-service";
import { BookstoreServiceProvider} from "./copmonents/bookstore-service-contex/bookstore-servise-context";

import store from "./store";
import App from "./copmonents/app/app";

const bookstoreService = new BookstoreService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
           <BookstoreServiceProvider value={bookstoreService}>
              <Router>
                  <App />
              </Router>
           </BookstoreServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);
