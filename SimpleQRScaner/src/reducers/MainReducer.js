import { combineReducers } from 'redux'
import QRCodeReducer from "./QRCodeReducer";

const MainReducer = combineReducers({QRCodeReducer});

export default MainReducer;