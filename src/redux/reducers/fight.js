import { getRandom } from "../../utils/getRandom";

const INITIAL_STATE = {
  tutoriel: false,
  playersClickOnstartGame: false,
  startTv: false,
  round: 0,
  canPlay: true,
  dice: {
    value: null,
  },
  logs: [],
  attacker: "",
  defender: "",
  playerActionStatus: "",
  winner: false,
};

const fightReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OPEN_TUTORIEL": {
      return { ...state, tutoriel: true };
    }
    case "CLOSE_TUTORIEL": {
      return { ...state, tutoriel: false };
    }
    case "LAUNCH_TUTORIEL": {
      return { ...state, tutoriel: true };
    }

    case "LAUNCH_FIGHT": {
      return { ...state, playersClickOnstartGame: true };
    }
    case "START_TV": {
      return { ...state, startTv: true };
    }
    case "FIRST_ROUND": {
      return { ...state, round: getRandom(1, 2) };
    }
    case "UPDATE_ROUND": {
      return { ...state, round: action.payload.round };
    }
    case "CAN_PLAY": {
      return { ...state, canPlay: true };
    }
    case "CANT_PLAY": {
      return { ...state, canPlay: false };
    }
    case "UPDATE_DICE": {
      return {
        ...state,
        dice: {
          ...state.dice,
          value: action.payload.value,
        },
      };
    }
    case "UPDATE_LOGS": {
      return { ...state, logs: [...state.logs, action.payload.newlog] };
    }
    case "RESET_LOGS": {
      return { ...state, logs: [] };
    }
    case "UPDATE_ATTACKER": {
      return { ...state, attacker: action.payload.attacker };
    }
    case "UPDATE_DEFENDER": {
      return { ...state, defender: action.payload.defender };
    }
    case "PLAYER_ACTION_STATUS_FIGHTSTART": {
      return { ...state, playerActionStatus: "fightStart" };
    }
    case "PLAYER_ACTION_STATUS_HIT": {
      return { ...state, playerActionStatus: "hit" };
    }
    case "PLAYER_ACTION_STATUS_FAIL": {
      return { ...state, playerActionStatus: "fail" };
    }
    case "PLAYER_ACTION_STATUS_POTION_OK": {
      return { ...state, playerActionStatus: "potionOk" };
    }
    case "PLAYER_ACTION_STATUS_POTION_NOK": {
      return { ...state, playerActionStatus: "potionNok" };
    }
    case "PLAYER_ACTION_STATUS_POTION_ZERO": {
      return { ...state, playerActionStatus: "potionZero" };
    }
    case "PLAYER_ACTION_STATUS_DEFENSE": {
      return { ...state, playerActionStatus: "defense" };
    }
    case "PLAYER_ACTION_STATUS_ALREADY_DEFENSE": {
      return { ...state, playerActionStatus: "alreadyDefense" };
    }
    case "PLAYER_ACTION_STATUS_COUNTER_ATTACK": {
      return { ...state, playerActionStatus: "counterAttack" };
    }
    case "PLAYER_ACTION_STATUS_MAGE_WAR_ULTIM": {
      return { ...state, playerActionStatus: "stun" };
    }
    case "PLAYER_ACTION_STATUS_ROGUE_ULTIM": {
      return { ...state, playerActionStatus: "theft" };
    }
    case "PLAYER_ACTION_STATUS_ROGUE_ULTIM_FAIL": {
      return { ...state, playerActionStatus: "nothingToSteal" };
    }
    case "PLAYER_ACTION_STATUS_RESET": {
      return { ...state, playerActionStatus: "" };
    }

    case "OPEN_WINNER": {
      return { ...state, winner: true };
    }
    case "CLOSE_WINNER": {
      return { ...state, winner: false };
    }

    case "RESET_FIGHT_REDUCER": {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
};

export default fightReducer;
