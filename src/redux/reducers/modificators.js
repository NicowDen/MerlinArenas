import { getRandom } from "../../utils/getRandom";

const INITIAL_STATE = {
  inputP1ValidationError: false,
  inputP2ValidationError: false,
  pseudoSelectedP1: false,
  pseudoSelectedP2: false,
  classSelectedP1: false,
  classSelectedP2: false,
  playersReady: false,
  fightStart: false,
  bckRandom: null,
};

const modificatorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PLAYER1_PSEUDO_INPUT_ERROR": {
      return { ...state, inputP1ValidationError: true };
    }
    case "PLAYER2_PSEUDO_INPUT_ERROR": {
      return { ...state, inputP2ValidationError: true };
    }
    case "PLAYER1_PSEUDO_INPUT_ERROR_RESET": {
      return { ...state, inputP1ValidationError: false };
    }
    case "PLAYER2_PSEUDO_INPUT_ERROR_RESET": {
      return { ...state, inputP2ValidationError: false };
    }
    case "PLAYER1_PSEUDO_VALIDATE": {
      return { ...state, pseudoSelectedP1: true };
    }
    case "PLAYER2_PSEUDO_VALIDATE": {
      return { ...state, pseudoSelectedP2: true };
    }
    case "PLAYER1_PSEUDO_EDIT": {
      return { ...state, pseudoSelectedP1: false };
    }
    case "PLAYER2_PSEUDO_EDIT": {
      return { ...state, pseudoSelectedP2: false };
    }
    case "PLAYER1_CLASS_VALIDATE": {
      return { ...state, classSelectedP1: true };
    }
    case "PLAYER2_CLASS_VALIDATE": {
      return { ...state, classSelectedP2: true };
    }
    case "PLAYER1_CLASS_EDIT": {
      return { ...state, classSelectedP1: false };
    }
    case "PLAYER2_CLASS_EDIT": {
      return { ...state, classSelectedP2: false };
    }
    case "PLAYERS_READY_TO_FIGHT": {
      return { ...state, playersReady: true };
    }
    case "PLAYERS_NOT_READY_TO_FIGHT": {
      return { ...state, playersReady: false };
    }
    case "FIGHT_START": {
      return { ...state, fightStart: true };
    }
    case "FIGHT_END": {
      return { ...state, fightStart: false };
    }
    case "GET_RANDOM_BCK": {
      return { ...state, bckRandom: getRandom(0, 1) };
    }
    case "RESET_MODIFICATORS_REDUCER": {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
};

export default modificatorsReducer;
