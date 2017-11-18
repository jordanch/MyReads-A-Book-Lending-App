import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { safe } from "./utils/type";

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookShelfChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            bookShelf: props.book.shelf
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { book } = this.props;
        e.preventDefault();
        this.props.onBookShelfChange({ book: book, shelf: e.target.value });
    }

    render() {
        const { book, onChange } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ safe(() => book.imageLinks.thumbnail, null)})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.bookShelf} onChange={this.handleChange}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{safe(() => book.authors.join(', '), null)}</div>
            </div>
        )
    }
}

export default Book