import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props
    console.log('aa',  this.props.logined);
    return (
      <Route 
        {...props} 
        render={props => (
          this.props.logined ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}
function mapStateToProps(state){
    return {
      logined: state.auth
    }
}
  
export default connect(mapStateToProps)(ProtectedRoute);