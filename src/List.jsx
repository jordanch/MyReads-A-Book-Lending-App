import React, { Component } from 'react';
import BookShelf from "./BookShelf";

class List extends Component {
    render() {
        return (
            <div className="list-books-content">
                <BookShelf section={'currently-reading'} />
            </div>
        )
    }
}

export default List
