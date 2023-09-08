const INITIAL_STATE = {
  animationOnPseudoP1Validation: false,
  animationOnPseudoP2Validation: false,
  animationOnClassP1Validation: false,
  animationOnClassP2Validation: false,
  animationFightingButton: false,
  animationFightStart: false,
  animationTutoriel: false,
};

const animationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ANIMATION_P1_PSEUDO_VALIDATION": {
      return {
        ...state,
        animationOnPseudoP1Validation: true,
      };
    }
    case "ANIMATION_P2_PSEUDO_VALIDATION": {
      return {
        ...state,
        animationOnPseudoP2Validation: true,
      };
    }
    case "ANIMATION_P1_PSEUDO_VALIDATION_CANCEL": {
      return {
        ...state,
        animationOnPseudoP1Validation: false,
      };
    }
    case "ANIMATION_P2_PSEUDO_VALIDATION_CANCEL": {
      return {
        ...state,
        animationOnPseudoP2Validation: false,
      };
    }
    case "ANIMATION_P1_CLASS_VALIDATION": {
      return {
        ...state,
        animationOnClassP1Validation: true,
      };
    }
    case "ANIMATION_P2_CLASS_VALIDATION": {
      return {
        ...state,
        animationOnClassP2Validation: true,
      };
    }
    case "ANIMATION_P1_CLASS_VALIDATION_CANCEL": {
      return {
        ...state,
        animationOnClassP1Validation: false,
      };
    }
    case "ANIMATION_P2_CLASS_VALIDATION_CANCEL": {
      return {
        ...state,
        animationOnClassP2Validation: false,
      };
    }
    case "ANIMATION_FIGHTING_BUTTON": {
      return {
        ...state,
        animationFightingButton: true,
      };
    }
    case "ANIMATION_FIGHTING_BUTTON_CANCEL": {
      return {
        ...state,
        animationFightingButton: false,
      };
    }
    case "ANIMATION_FIGHT_START": {
      return {
        ...state,
        animationFightStart: true,
      };
    }
    case "ANIMATION_FIGHT_START_CANCEL": {
      return {
        ...state,
        animationFightStart: false,
      };
    }
    case "ANIMATION_CLOSE_TUTORIEL_START": {
      return {
        ...state,
        animationTutoriel: true,
      };
    }
    case "ANIMATION_CLOSE_TUTORIEL_CANCEL": {
      return {
        ...state,
        animationTutoriel: false,
      };
    }

    case "RESET_ANIMATIONS_REDUCER": {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
};

export default animationsReducer;
