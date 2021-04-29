import { combineReducers } from 'redux';
import BooksReducers from './reducer_books';
import ActiveBook from './reducer_active_book';
import AuthReducers from './reducer_auth';

const rootReducer = combineReducers({
  auth: AuthReducers,
  books: BooksReducers,
  activeBook: ActiveBook,
});

export default rootReducer;
