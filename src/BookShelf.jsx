import React, { Component } from 'react';
import BookShelfSection from "./BookShelfSection";
import PropTypes from "prop-types";
import groupBy from "lodash.groupby";

class BookShelf extends Component {

    shelfIdNameMap = {
        'wantToRead': 'Want to Read',
        'read': 'Read',
        'currentlyReading': 'Currently Reading'
    }

    render() {
        if (Array.isArray(this.props.books) && this.props.books.length > 0) {
            const sections = groupBy(this.props.books, 'shelf');
            return (
                <div className="list-books-content">
                    {
                        Object.keys(sections).map(sectionId => {
                            return <BookShelfSection
                                key={sectionId}
                                className="bookshelf"
                                sectionName={this.shelfIdNameMap[sectionId]}
                                books={sections[sectionId]} />
                        })
                    }
                </div>
            )
        } else {
            return null;
        }
    }
}

BookShelfSection.propTypes = {
    books: PropTypes.array,
};

export default BookShelf
