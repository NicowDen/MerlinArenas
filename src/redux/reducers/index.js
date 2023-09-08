import { combineReducers } from "redux";
import playersReducer from "./players";
import modificatorsReducer from "./modificators";
import animationsReducer from "./animations";
import windowSizeReducer from "./windowSize";
import fightReducer from "./fight";

const finalReducer = combineReducers({
  playersReducer,
  modificatorsReducer,
  animationsReducer,
  windowSizeReducer,
  fightReducer,
});

export default finalReducer;
