import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { search, update } from "./BooksAPI";
import Book from "./Book";
import debounce from "lodash.debounce";
import escapedString from "escape-string-regexp";
import "./Search.css";

class Search extends Component {

    static propTypes = {
        history: PropTypes.object,
        books: PropTypes.array,
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.makeSearch = this.makeSearch.bind(this);
        this.makeSearch = debounce(this.makeSearch.bind(this), 1000, {
            leading: false,
            trailing: true
        });
        this.handleBookShelfChangeRequest = this.handleBookShelfChangeRequest.bind(this);
        this.applyCurrentShelfState = this.applyCurrentShelfState.bind(this);
    }

    state = {
        query: '',
        matchingBooks: [],
        isFetching: false
    }

    handleChange(e) {
        const value = escapedString(e.target.value);
        e.preventDefault();
        //todo: what is rejectedResponse for??
        if (value !== '') {
            this.rejectResponse = false;
            this.setState({
                query: value,
                isFetching: true
            });
            this.makeSearch(value);
        } else {
            this.rejectResponse = true;
            this.setState({
                query: '',
                matchingBooks: [],
                isFetching: false
            });
        }
    }

    handleBookShelfChangeRequest(client) {
        if (client.shelf !== 'none') {
            update(client.book, client.shelf).then(groupResponse => {
                // change router to /
                const { history } = this.props;
                history.push('/');
            });
        }
    }

    makeSearch(query) {
        search(query)
            .then(matchingBooks => {
                if (this.rejectResponse !== true) {
                    // update the response with the books shelf.
                    this.setState({
                        matchingBooks: Array.isArray(matchingBooks) ? this.applyCurrentShelfState(matchingBooks) : [],
                        isFetching: false
                    });
                }
            });
    }

    // todo: if you navigate to /search first, the functionality of getting book shelf breaks.
    applyCurrentShelfState(searchResponse) {
        const { books } = this.props;
        // ^
        // |
        // cheap workaround
        let currentBookIdBookMap = {};
        if (books) {
            currentBookIdBookMap = books.reduce((acc, curr) => {
                acc[curr.id] = curr;

                return acc;
            }, {});
        }
        // perf: optimize?
        return searchResponse.map(book => {
            let matchingBook;
            matchingBook = currentBookIdBookMap[book.id];

            return Object.assign({}, book, {
                shelf: matchingBook ? matchingBook.shelf: 'default'
            })
        });

    }

    render() {

        const BookList = () => (
            <ol className="books-grid">
                {
                    this.state.matchingBooks.map(book => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                dontChangeWhen="none"
                                onBookShelfChange={this.handleBookShelfChangeRequest} />
                        </li>
                    ))
                }
            </ol>
        );

        const IsLoading = () => (
            <div className="loading-text">
                ...Loading
            </div>
        )

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
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
                    {this.state.isFetching === false ? <BookList /> : <IsLoading />}
                </div>
            </div>
        )
    }

}

export default Search