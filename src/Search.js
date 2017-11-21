import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from 'react-router-dom';
import { search, update } from "./BooksAPI";
import Book from "./Book";
import debounce from "lodash.debounce";
import escapedString from "escape-string-regexp";
import "./Search.css";

class Search extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.makeSearch = debounce(this.makeSearch.bind(this), 1000, {
            leading: false,
            trailing: true
        });
        this.handleBookShelfChangeRequest = this.handleBookShelfChangeRequest.bind(this);
    }

    state = {
        query: '',
        matchingBooks: [],
        isFetching: false
    }

    handleChange(e) {
        const value = escapedString(e.target.value);
        e.preventDefault();
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
                const { history } = this.props;
                history.push('/');
            });
        }
    }

    makeSearch(query) {
        search(query).then(books => {
            if (this.rejectResponse !== true) {
                this.setState({
                    matchingBooks: Array.isArray(books) ? books : [],
                    isFetching: false
                });
            }
        })
    }

    render() {

        const BookList = () => (
            <ol className="books-grid">
                {
                    this.state.matchingBooks.map(book => (
                        <li key={book.id}>
                            <Book
                                book={Object.assign({}, book, { shelf: 'default' })}
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