import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { safe } from "./utils/type";

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookShelfChange: PropTypes.func.isRequired,
        dontChangeWhen: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { book, dontChangeWhen } = this.props;
        const { value } = e.target;
        e.preventDefault();
        if (value !== dontChangeWhen) {
            new Promise((resolve, reject) => {
                this.setState({
                    isLoading: true
                });
                this.props.onBookShelfChange({
                    book: book,
                    shelf: value
                }, resolve)
            });
        }
    }

    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${safe(() => book.imageLinks.thumbnail, null)})` }}></div>
                    <div className={classNames(
                        "book-shelf-changer", {
                            "book-is-updating": this.state.isLoading
                        }
                    )}>
                        <select
                            value={book.shelf}
                            onChange={this.handleChange}
                            disabled={this.state.isLoading}>
                            <option value="default" disabled>Move to...</option>
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