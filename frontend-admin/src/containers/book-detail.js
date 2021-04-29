import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component{
  render(){
    if(!this.props.book){
      return <div>Chua chon quyen sach nao</div>
    }
    return (
      <div>
        <h3>Detail:</h3>
        <div>{this.props.book.title}</div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    book: state.activeBook,
  }
}

export default connect(mapStateToProps)(BookDetail);