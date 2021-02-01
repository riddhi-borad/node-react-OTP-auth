import {combineReducers} from 'redux';
import UserReducer from './Components/Redux/UserReducer';
export default combineReducers({
    auth:UserReducer,   
})