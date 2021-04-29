import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Home extends Component{
  render(){
    return (
      <div>
        <h3>Home:</h3>
      </div>
    )
  }
};

// function mapStateToProps(state) {
//   return {
//     book: state.activeBook,
//   }
// }

// export default connect(mapStateToProps)(BookDetail);