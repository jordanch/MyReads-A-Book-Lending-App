import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAll, update } from "./BooksAPI";
import { isNullOrUndefined, isEmptyReferenceType } from "./utils/type";
import groupBy from "lodash.groupby";
import BookShelfSection from "./BookShelfSection";

class Overview extends Component {

    static propTypes = {
        appName: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.handleBookShelfChange = this.handleBookShelfChange.bind(this);
    }

    state = {
        groupedBooks: null
    }

    shelfIdNameMap = {
        'wantToRead': 'Want to Read',
        'read': 'Read',
        'currentlyReading': 'Currently Reading'
    }

    componentDidMount() {
        getAll().then(books => {
            const groupedBooks = this.groupBooksByShelf(books);
            this.setState({
                groupedBooks: groupedBooks
            });
        })
    }

    groupBooksByShelf(books) {
        return groupBy(books, 'shelf');
    }

    updateGroupedBooks(currentBookShelfState) {
        const { groupedBooks } = this.state;
        const allBooks = Object.keys(groupedBooks)
            .map(shelfKey => groupedBooks[shelfKey])
            .reduce((acc, curr) => {
                acc = acc.concat(curr);
                return acc;
            }, [])

        const updatedGroupedBooks = {};
        Object.keys(currentBookShelfState).forEach(shelfKey => {
            updatedGroupedBooks[shelfKey] = currentBookShelfState[shelfKey]
                .map(getBook)
                .map(updateBookShelf.bind(null, shelfKey))
                .filter(book => !isNullOrUndefined(book));
        })

        function getBook(bookId) {
            const book = allBooks.find(book => book.id === bookId);
            if (isNullOrUndefined(book)) {
                null;
            } else {
                return book;
            }
        }

        function updateBookShelf(shelfId, book) {
            return Object.assign({}, book, {shelf: shelfId});
        }

        this.setState({
            groupedBooks: updatedGroupedBooks
        });
    }

    handleBookShelfChange(client, callBack) {
        update(client.book, client.shelf).then(groupResponse => {
            this.updateGroupedBooks(groupResponse);
            callBack();
        })

    }

    render() {
        const { groupedBooks } = this.state;

        const Header = () => {
           return (
                <div className="list-books-title">
                    <h1>{this.props.appName}</h1>
                </div>
            )
        };

        if (isEmptyReferenceType(groupedBooks) || isNullOrUndefined(groupedBooks)) {

            return <Header/>
        } else {

            return (
                <div className="list-books" >
                    <Header/>
                    <div className="list-books-content">
                        {
                            Object.keys(groupedBooks).map(sectionId => {
                                return (
                                    <BookShelfSection
                                        key={sectionId}
                                        className="bookshelf"
                                        sectionName={this.shelfIdNameMap[sectionId]}
                                        books={groupedBooks[sectionId]}
                                        onBookShelfChange={this.handleBookShelfChange}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="open-search">
                        <Link to="/search">Add a book</Link>
                    </div>
                </div>
            );
        }
    }
}

export default Overview;