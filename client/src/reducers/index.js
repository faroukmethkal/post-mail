import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import { reducer as formReducer } from 'redux-form'
import reducer_companey from './reducer_company'


export default combineReducers({
  alert,
  auth,
  form: formReducer,
  company: reducer_companey
});
