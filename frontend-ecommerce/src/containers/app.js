import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import ProtectedRoute from '../components/ProtectRoute';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/login" component={Login}></Route>
          <ProtectedRoute path="/" component={Home}></ProtectedRoute>
        </Router>
      </div>
    );
  }
}