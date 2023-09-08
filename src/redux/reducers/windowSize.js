const INITIAL_STATE = {
  windowWidth: "",
  windowHeight: "",
};

const windowSizeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_WINDOW_WIDTH": {
      return { ...state, windowWidth: action.payload.wWidth };
    }
    case "GET_WINDOW_HEIGHT": {
      return { ...state, windowHeight: action.payload.wHeight };
    }

    default: {
      return state;
    }
  }
};

export default windowSizeReducer;
