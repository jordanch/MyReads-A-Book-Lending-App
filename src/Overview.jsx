import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from './List';
import { _constants } from "./config/config";
import { isNullOrUndefined } from "./utils/type";

const bookShelf = [
    {

    }
]

class Overview extends Component {

    render() {
        const appName = isNullOrUndefined(_constants.appName) ? 'MyReads' : _constants.appName;
        return (
            <div className="list-books" >
                <div className="list-books-title">
                    <h1>{ this.appName }</h1>
                </div>
                <List />
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        );
    }
}

Overview.propTypes = {
    title: PropTypes.bool
};

export default Overview;