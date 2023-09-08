import mc from "./players-menus.module.scss";
import { useSelector, useDispatch } from "react-redux";
//components//
import PseudoInputs from "../players-menus-sub-menu/pseudoInputs/PseudoInputs";
import ClassSelection from "../players-menus-sub-menu/class-selection/ClassSelection";
import FightingButton from "../players-menus-fighting-button/FightingButton";
import { useEffect } from "react";

const PlayersMenu = () => {
  const dispatch = useDispatch();

  const {
    player1,
    player2,
    pseudoSelectedP1,
    pseudoSelectedP2,
    inputP1ValidationError,
    inputP2ValidationError,
    classSelectedP1,
    classSelectedP2,
    animationOnPseudoP1Validation,
    animationOnPseudoP2Validation,
    animationOnClassP1Validation,
    animationOnClassP2Validation,
    playersReady,
    animationFightingButton,
  } = useSelector((store) => {
    return {
      player1: store.playersReducer.player1,
      player2: store.playersReducer.player2,
      pseudoSelectedP1: store.modificatorsReducer.pseudoSelectedP1,
      pseudoSelectedP2: store.modificatorsReducer.pseudoSelectedP2,
      inputP1ValidationError: store.modificatorsReducer.inputP1ValidationError,
      inputP2ValidationError: store.modificatorsReducer.inputP2ValidationError,
      classSelectedP1: store.modificatorsReducer.classSelectedP1,
      classSelectedP2: store.modificatorsReducer.classSelectedP2,
      animationOnPseudoP1Validation:
        store.animationsReducer.animationOnPseudoP1Validation,
      animationOnPseudoP2Validation:
        store.animationsReducer.animationOnPseudoP2Validation,
      animationOnClassP1Validation:
        store.animationsReducer.animationOnClassP1Validation,
      animationOnClassP2Validation:
        store.animationsReducer.animationOnClassP2Validation,
      playersReady: store.modificatorsReducer.playersReady,
      animationFightingButton: store.animationsReducer.animationFightingButton,
    };
  });

  //change value on Pseudo Inputs and player1/2.pseudo
  const updatePseudo = (player, pseudo) => {
    dispatch({
      type: "PLAYER_PSEUDO",
      payload: { player, pseudo: pseudo.slice(0, 10) },
    });
  };

  //confirm player pseudo validation or launch error on input if try to validate an empty pseudo
  const pseudoValidationEnter = (e, playerNumber) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() !== "") {
        dispatch({ type: `ANIMATION_P${playerNumber}_PSEUDO_VALIDATION` });
        dispatch({ type: `PLAYER${playerNumber}_PSEUDO_INPUT_ERROR_RESET` });
        setTimeout(() => {
          //setTimeout to match with transition on css and let animation finish before components switch
          dispatch({ type: `PLAYER${playerNumber}_PSEUDO_VALIDATE` });
        }, 200);
      } else {
        dispatch({ type: `PLAYER${playerNumber}_PSEUDO_INPUT_ERROR` });
        setTimeout(() => {
          //setTimeout to match with transition on css and let animation finish before components switch
          dispatch({ type: `PLAYER${playerNumber}_PSEUDO_INPUT_ERROR_RESET` });
        }, 1000);
      }
    }
  };
  const pseudoValidation = (value, playerNumber) => {
    if (value.trim() !== "") {
      dispatch({ type: `ANIMATION_P${playerNumber}_PSEUDO_VALIDATION` });
      dispatch({ type: `PLAYER${playerNumber}_PSEUDO_INPUT_ERROR_RESET` });
      setTimeout(() => {
        //setTimeout to match with transition on css and let animation finish before components switch
        dispatch({ type: `PLAYER${playerNumber}_PSEUDO_VALIDATE` });
      }, 200);
    } else {
      dispatch({ type: `PLAYER${playerNumber}_PSEUDO_INPUT_ERROR` });
      setTimeout(() => {
        //setTimeout to match with transition on css and let animation finish before components switch
        dispatch({ type: `PLAYER${playerNumber}_PSEUDO_INPUT_ERROR_RESET` });
      }, 1000);
    }
  };

  //for let player change his pseudo
  const onEditPseudoClick = (playerNumber) => {
    dispatch({ type: `ANIMATION_P${playerNumber}_PSEUDO_VALIDATION_CANCEL` });
    setTimeout(() => {
      //setTimeout to match with transition on css and let animation finish before components switch
      dispatch({
        type: "PLAYER_PSEUDO",
        payload: { player: `player${playerNumber}`, pseudo: "" },
      });
      dispatch({ type: `PLAYER${playerNumber}_PSEUDO_EDIT` });
    }, 100);
  };

  //for let player change his class
  const onEditClassClick = (playerNumber) => {
    dispatch({ type: `PLAYER${playerNumber}_CLASS_EDIT` });
    dispatch({
      type: "UPDATE_PLAYER_CLASS",
      payload: { player: `player${playerNumber}`, playerClass: {} },
    });
    setTimeout(() => {
      //setTimeout to match with transition on css and let animation finish before components switch
      dispatch({ type: `ANIMATION_P${playerNumber}_CLASS_VALIDATION_CANCEL` });
    }, 200);
  };

  //confirm player class validation
  const onClickplayerClassSelection = (playerNumber, playerClass) => {
    dispatch({ type: `ANIMATION_P${playerNumber}_CLASS_VALIDATION` });
    setTimeout(() => {
      //setTimeout to match with transition on css and let animation finish before components switch
      dispatch({
        type: "UPDATE_PLAYER_CLASS",
        payload: { player: `player${playerNumber}`, playerClass: playerClass },
      });
      dispatch({ type: `PLAYER${playerNumber}_CLASS_VALIDATE` });
    }, 500);
  };

  useEffect(() => {
    if (
      classSelectedP1 &&
      classSelectedP2 &&
      pseudoSelectedP1 &&
      pseudoSelectedP2
    ) {
      dispatch({ type: `PLAYERS_READY_TO_FIGHT` });
      setTimeout(() => {
        //setTimeout to match with transition on css and let animation finish before components switch
        dispatch({ type: `ANIMATION_FIGHTING_BUTTON` });
      }, 100);
    } else {
      dispatch({ type: `ANIMATION_FIGHTING_BUTTON_CANCEL` });

      setTimeout(() => {
        //setTimeout to match with transition on css and let animation finish before components switch
        dispatch({ type: `PLAYERS_NOT_READY_TO_FIGHT` });
      }, 300);
    }
  }, [
    dispatch,
    player1.playerClass.className,
    player2.playerClass.className,
    pseudoSelectedP1,
    pseudoSelectedP2,
  ]);

  const onFightStartButtonClick = () => {
    dispatch({ type: `ANIMATION_FIGHT_START` });
    dispatch({
      type: "ANIMATION_CLOSE_TUTORIEL_CANCEL",
    });
    dispatch({ type: "RESET_FIGHT_REDUCER" });
    dispatch({ type: "GET_RANDOM_BCK" });
    setTimeout(() => {
      //setTimeout to match with transition on css and let animation finish before components switch
      dispatch({ type: `FIGHT_START` });
      dispatch({ type: `OPEN_TUTORIEL` });
    }, 300);
  };

  return (
    <div className={mc.container}>
      <div className={mc.players_menu}>
        <div className={mc.player1}>
          {!pseudoSelectedP1 ? (
            <div
              className={
                !animationOnPseudoP1Validation
                  ? `${mc.player1_pseudo} ${mc.animate_fade_in}`
                  : `${mc.player1_pseudo} ${mc.animate_opacity}`
              }
            >
              <PseudoInputs
                inputValue={player1.pseudo}
                player="player1"
                pseudoInTitle="Joueur 1"
                enterValidation={(e) => pseudoValidationEnter(e, 1)}
                inputValidationError={inputP1ValidationError}
                updatePseudo={updatePseudo}
                pseudoValidation={(value) => pseudoValidation(value, 1)}
              />
            </div>
          ) : (
            <div
              className={
                animationOnPseudoP1Validation
                  ? `${mc.player1_class_selection} ${mc.animate_fade_in}`
                  : `${mc.player1_class_selection} ${mc.animate_opacity}`
              }
            >
              <ClassSelection
                pseudo={player1.pseudo}
                onEditPseudoClick={() => onEditPseudoClick(1)}
                onEditClassClick={() => onEditClassClick(1)}
                onClickplayerClassSelection={(selectedClass) =>
                  onClickplayerClassSelection(1, selectedClass)
                }
                onClassButtonSelectionClick={classSelectedP1} //true switch the buttons classes list to a span class name
                classPlayerChoice={player1.playerClass.className}
                classColor={player1.playerClass.color}
                animationOnClassValidation={animationOnClassP1Validation} //true launch the animation.
              />
            </div>
          )}
        </div>
        {playersReady && (
          <div
            className={
              !animationFightingButton
                ? `${mc.fighting_button} ${mc.animate_opacity}`
                : `${mc.fighting_button} ${mc.animate_fade_in}`
            }
          >
            <FightingButton onFightStartButtonClick={onFightStartButtonClick} />
          </div>
        )}

        <div className={mc.player2}>
          {!pseudoSelectedP2 ? (
            <div
              className={
                !animationOnPseudoP2Validation
                  ? `${mc.player2_pseudo} ${mc.animate_fade_in}`
                  : `${mc.player2_pseudo} ${mc.animate_opacity}`
              }
            >
              <PseudoInputs
                inputValue={player2.pseudo}
                player="player2"
                pseudoInTitle="Joueur 2"
                enterValidation={(e) => pseudoValidationEnter(e, 2)}
                inputValidationError={inputP2ValidationError}
                updatePseudo={updatePseudo}
                pseudoValidation={(value) => pseudoValidation(value, 2)}
              />
            </div>
          ) : (
            <div
              className={
                animationOnPseudoP2Validation
                  ? `${mc.player2_class_selection} ${mc.animate_fade_in}`
                  : `${mc.player2_class_selection} ${mc.animate_opacity}`
              }
            >
              <ClassSelection
                pseudo={player2.pseudo}
                onEditPseudoClick={() => onEditPseudoClick(2)}
                onEditClassClick={() => onEditClassClick(2)}
                onClickplayerClassSelection={(selectedClass) =>
                  onClickplayerClassSelection(2, selectedClass)
                }
                onClassButtonSelectionClick={classSelectedP2} //true switch the buttons classes list to a span class name
                classPlayerChoice={player2.playerClass.className}
                classColor={player2.playerClass.color}
                animationOnClassValidation={animationOnClassP2Validation} //true launch the animation.
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayersMenu;
