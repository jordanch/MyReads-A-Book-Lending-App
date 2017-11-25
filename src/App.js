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
    this.setAllBooks = this.setAllBooks.bind(this);
    this.handleBookShelfChange = this.handleBookShelfChange.bind(this);
  }

  state = {
    books: []
  }

  setAllBooks(books) {
    // const groupedBooks = this.groupBooksByShelf(books);
    this.setState({
      books: books,
    });
  }

  handleBookShelfChange(client, resolve) {
    update(client.book, client.shelf).then(groupResponse => {
      const updatedBooks = this.state.books.map(book => {
        const bookId = book.id;
        let shelves = Object.keys(groupResponse);
        for (let x = 0; x < shelves.length; x++) {
          if (groupResponse[shelves[x]].indexOf(bookId) > -1) {
            book.shelf = shelves[x];
            break;
          }
        }
      })
      this.setState({
        books: updatedBooks
      });
      resolve();
    })
  }

  render() {
    const appName = safe(() => _constants.appName, 'MyReads');
    const { books } = this.state;
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
              <Overview
                appName={appName}
                books={books}
                handleBookShelfChange={this.handleBookShelfChange}
                setAllBooks={this.setAllBooks} />
            )
          }}
        />
      </div>
    )
  }
}

export default BooksApp
