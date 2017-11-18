import React from 'react'
import { Route } from "react-router-dom"
import { _constants } from "./config/config";
import { safe } from "./utils/type"
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from "./Search"
import Overview from "./Overview"

class BooksApp extends React.Component {
  render() {
    const appName = safe(() => _constants.appName, 'MyReads');
    return (
      <div className="app">
        <Route
          exact path="/search"
          component={Search}
        />
        <Route
          exact path="/"
          render={() => {
            return (
              <Overview appName={appName}/>
            )
          }}
        />
      </div>
    )
  }
}

export default BooksApp
