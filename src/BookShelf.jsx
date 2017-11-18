import React, { Component } from 'react';
import PropTypes from "prop-types";
import Book from './Book';

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.section}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li>
                            {<Book />}
                        </li>
                    </ol>
                </div>
            </div>
        );
    }
}

BookShelf.propTypes = {
    section: PropTypes.string.isRequired,
}

export default BookShelf;