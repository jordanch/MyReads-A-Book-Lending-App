import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAll } from "./BooksAPI";
import { isNullOrUndefined, isEmptyReferenceType } from "./utils/type";
import BookShelfSection from "./BookShelfSection";

class Overview extends Component {

    static propTypes = {
        appName: PropTypes.string.isRequired,
        setAllBooks: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired,
        handleBookShelfChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    state = {
        isLoading: false
    }

    componentDidMount() {
        getAll().then(books => {
            this.props.setAllBooks(books);
            this.setState({
                isLoading: false
            });
        })
    }

    render() {
        const { books } = this.props;

        const Header = () => {
            return (
                <div className="list-books-title">
                    <h1>{this.props.appName}</h1>
                </div>
            )
        };

        const Loading = () => (
            <div className="list-loading">
                <p className="loading-text">Loading...</p>
            </div>
        )

        const Books = () => {
            return (
                <div className="list-books-content">
                    <BookShelfSection
                        className="bookshelf"
                        sectionName="Currently Reading"
                        books={books.filter(book => book.shelf === 'currentlyReading')}
                        onBookShelfChange={this.props.handleBookShelfChange} />
                    <BookShelfSection
                        className="bookshelf"
                        sectionName="Want To Read"
                        books={books.filter(book => book.shelf === 'wantToRead')}
                        onBookShelfChange={this.props.handleBookShelfChange} />
                    <BookShelfSection
                        className="bookshelf"
                        sectionName="Read"
                        books={books.filter(book => book.shelf === 'read')}
                        onBookShelfChange={this.props.handleBookShelfChange} />
                </div>
            )
        }

        const { isLoading } = this.state;

        return (
            <div className="list-books" >
                <Header />
                {isLoading === true ?
                    <Loading />
                    :
                    <Books />
                }

                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

export default Overview;