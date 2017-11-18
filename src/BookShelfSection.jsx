import React, { Component } from 'react';
import PropTypes from "prop-types";
import Book from './Book';

class BookShelfSection extends Component {

    static propTypes = {
        sectionName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    }

    render() {
        return (
            <div>
                <h2 className="bookshelf-title">{this.props.sectionName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.books.map((book) => {
                                return (
                                    <li key={book.id}>
                                        <Book book={book}/>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelfSection;