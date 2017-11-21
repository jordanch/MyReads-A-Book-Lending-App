import React from 'react'
import { Route } from "react-router-dom"
import { _constants } from "./config/config";
import { safe } from "./utils/type"
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from "./Search"
import Overview from "./Overview"
import groupBy from "lodash.groupby";

class BooksApp extends React.Component {

  state = {
    books: []
  }

  setAllBooks(books) {
    // const groupedBooks = this.groupBooksByShelf(books);
    this.setState({
      books: books,
    });
  }

  groupBooksByShelf(books) {
    return groupBy(books, 'shelf');
  }

  render() {
    const appName = safe(() => _constants.appName, 'MyReads');
    return (
      <div className="app">
        <Route
          exact path="/search"
          component={Search}
        />
        <Route
          exact path="/"
          render={() => {
            return (
              <Overview appName={appName} />
            )
          }}
        />
      </div>
    )
  }
}

export default BooksApp
