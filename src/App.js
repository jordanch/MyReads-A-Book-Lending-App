import React from 'react'
import { Route } from "react-router-dom"
import { _constants } from "./config/config";
import { safe } from "./utils/type"
import { update } from "./BooksAPI";
import './App.css'
import Search from "./Search"
import Overview from "./Overview"
import groupBy from "lodash.groupby";

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.updateBooks = this.updateBooks.bind(this);
    this.handleBookShelfChange = this.handleBookShelfChange.bind(this);
  }

  state = {
    books: []
  }

  updateBooks(books) {
    // const groupedBooks = this.groupBooksByShelf(books);
    this.setState({
      books: books,
    });
  }

  /**
   * Handle User changing a book's shelf.
   * @param {object} client - a book container, itself and the shelf it is changing to.
   * @param {*} resolve - an optional callback, called after update http put responds.
   */

  handleBookShelfChange(client, resolve) {

    const { books } = this.state;

    // iterate allBooks (store) and update accordingly by lookup against bookShelfMap.
    update(client.book, client.shelf).then(response => {
      // create a hash with grouped response - bookId: shelf - for quick lookup.
      const bookIdUpdatedShelfMap = Object.keys(response).reduce((acc, shelfCategory) => {
        const shelf = shelfCategory;
        const bookIds = response[shelf];
        bookIds.forEach(bookId => acc[bookId] = shelf);

        return acc;
      }, {});

      // update all current books.
      const updatedBooks = books.map(book => {
        book.shelf = (() => {
          // todo: add guard for when updated response has book id that doesnt exist in current books.
          return bookIdUpdatedShelfMap[book.id];
        })()

        return book;
      });

      this.updateBooks(updatedBooks);
    });

    resolve();
  }

  render() {
    const appName = safe(() => _constants.appName, 'MyReads');
    const { books } = this.state;

    return (
      <div className="app" >
        <Route
          exact path="/search"
          component={Search}
        />
        <Route
          exact path="/"
          render={() => {
            return (
              <Overview
                appName={appName}
                books={books}
                handleBookShelfChange={this.handleBookShelfChange}
                updateBooks={this.updateBooks} />
            )
          }}
        />
      </div>
    )
  }
}

export default BooksApp
