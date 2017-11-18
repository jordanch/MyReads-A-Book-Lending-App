import React from 'react'
import { Route } from "react-router-dom"
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from "./Search"
import Overview from "./Overview"

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route
          exact path="/search"
          component={Search}
        />
        <Route
          exact path="/"
          component={Overview}
        />
      </div>
    )
  }
}

export default BooksApp
