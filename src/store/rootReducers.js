
import { combineReducers } from 'redux';
import Auth from './auth/reducer';
import Post from './post/reducer';
import User from './user/reducer';
import Category from './category/reducer';
import Menus from './menus/reducer';
import Comments from './comments/reducer';
import App from './app/reducer';

export default combineReducers({
  Auth,
  Post,
  User,
  Category,
  Menus,
  Comments,
  App
})

// const rootReducers = combineReducers({
//   Auth,
//   Post,
//   User,
// })

// export default rootReducers;