import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { search } from "./BooksAPI";
import Book from "./Book";

class Search extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        query: '',
        matchingBooks: []
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState({
            query: value
        });
        search(value).then(books => {
            this.setState({
                matchingBooks: Array.isArray(books) ? books : []
            });
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.matchingBooks.map(book => (
                                <li key={book.id}>
                                    <Book book={book} onBookShelfChange={() => { }} />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search