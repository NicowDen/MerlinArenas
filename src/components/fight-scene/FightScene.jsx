import mc from "./fight-scene.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
//components//
import LifeBar from "../fight-scene-elements/life-bar/LifeBar";
import MdjScene from "../fight-scene-elements/mdj-scene/MdjScene";
import Fight from "../fight-scene-elements/fight/Fight";
import Tv from "../fight-scene-elements/tv/Tv";
import Tutoriel from "../fight-scene-elements/tutoriel/Tutoriel";
import Winner from "../fight-scene-elements/winner/Winner";
//backgrouns images//
import arena1 from "../../images/arena1.jpeg";
import arena2 from "../../images/arena2.jpeg";
import arena3 from "../../images/arena3.jpeg";
import arena4 from "../../images/arena4.jpeg";
import arena5 from "../../images/arena4.jpeg";
import arena6 from "../../images/arena6.avif";
import arena7 from "../../images/arena7.jpeg";
//utils//
import { getRandom } from "../../utils/getRandom";
//MDJ dialogs//
import {
  mdjWelcome,
  mdjTauntAttacker,
  mdjTauntDefender,
  mdjFightWillStart,
  mdjPotionOk,
  mdjPotionNok,
  mdjNoMorePotion,
  mdjDefense,
  mdjAlreadyDef,
  mdjCounterAttack,
  mdjStun,
  mdjTheft,
  mdjNothingToSteal,
} from "../../constants/mdj";

const FightScene = () => {
  const dispatch = useDispatch();

  const {
    bckRandom,
    windowWidth,
    player1,
    player2,
    tutoriel,
    animationTutoriel,
    logs,
    playersClickOnstartGame,
    startTv,
    round,
    dice,
    attacker,
    defender,
    playerActionStatus,
    canPlay,
    winner,
  } = useSelector((store) => {
    return {
      bckRandom: store.modificatorsReducer.bckRandom,
      player1: store.playersReducer.player1,
      player2: store.playersReducer.player2,
      windowWidth: store.windowSizeReducer.windowWidth,
      tutoriel: store.fightReducer.tutoriel,
      animationTutoriel: store.animationsReducer.animationTutoriel,
      logs: store.fightReducer.logs,
      playersClickOnstartGame: store.fightReducer.playersClickOnstartGame,
      startTv: store.fightReducer.startTv,
      round: store.fightReducer.round,
      dice: store.fightReducer.dice,
      attacker: store.fightReducer.attacker,
      defender: store.fightReducer.defender,
      playerActionStatus: store.fightReducer.playerActionStatus,
      canPlay: store.fightReducer.canPlay,
      winner: store.fightReducer.winner,
    };
  });

  const arenaImages = [arena1, arena2, arena3, arena4, arena5, arena6, arena7];
  //mdj dialogs state rdm//
  const [random, setRandom] = useState(null);

  useEffect(() => {
    if (player1.playerClass.hp <= 0 || player2.playerClass.hp <= 0) {
      dispatch({ type: "OPEN_WINNER" });
    }
  }, [player1, player2]);

  // Fight end TimeOut to let switch components animation
  const onEndFightButtonClick = () => {
    dispatch({ type: `ANIMATION_FIGHT_START_CANCEL` });
    setRandom(getRandom(0, mdjWelcome.length - 1)); //to prepare next fight welcome MDJ message
    setTimeout(() => {
      dispatch({ type: "RESET_PLAYERS_REDUCER" });
      dispatch({ type: "RESET_ANIMATIONS_REDUCER" });
      dispatch({ type: `FIGHT_END` });
      dispatch({ type: "RESET_MODIFICATORS_REDUCER" });
    }, 500);
  };

  const closeTutoriel = () => {
    setRandom(getRandom(0, mdjWelcome.length - 1)); //mdjWelcome array length = 2
    dispatch({
      type: "ANIMATION_CLOSE_TUTORIEL_START",
    });
    setTimeout(() => {
      dispatch({ type: "CLOSE_TUTORIEL" });
    }, 400);
  };

  //DICE 20 value change//
  const newDice = () => {
    dispatch({
      type: "UPDATE_DICE",
      payload: { value: getRandom(1, 20) },
    });
  };

  const startGame = () => {
    dispatch({ type: "START_TV" });
    dispatch({ type: "PLAYER_ACTION_STATUS_FIGHTSTART" });
    setTimeout(() => {
      dispatch({ type: "LAUNCH_FIGHT" });
      dispatch({
        type: "FIRST_ROUND",
      });
      newDice();
    }, 500);
  };

  //in combat log on the bottom of the screen//
  const newLog = (string) => {
    dispatch({
      type: "UPDATE_LOGS",
      payload: {
        newlog: string,
      },
    });
  };

  //to define attacker and defender variables for some conditions ="player1" or "player2"  //
  const attackerDefenderStrings = (attacker, defender) => {
    dispatch({
      type: "UPDATE_ATTACKER",
      payload: { attacker },
    });
    dispatch({
      type: "UPDATE_DEFENDER",
      payload: { defender },
    });
  };

  //defender dodge chance//
  const dodge = (defender) => {
    return dice.value <= defender.playerClass.agi ? true : false;
  };

  //after each players action round change//
  const newRound = (nbRoundAdd) => {
    dispatch({ type: "CANT_PLAY" });
    setTimeout(() => {
      dispatch({
        type: "UPDATE_ROUND",
        payload: { round: round + nbRoundAdd },
      });
      dispatch({ type: "CAN_PLAY" });
      newDice();
    }, 2500);
  };

  //round is even or odd, so modulo2 to determine who can play. If round is odd player 1, else player 2
  //for each action we add 1 to round. No just change for 1 or 2. We need this way for capacities Cooldown.

  //===SKILLS====//
  //ATTACK SKILL//
  const onAttackClick = (
    attacker,
    defender,
    attackerTostring,
    defenderTostring
  ) => {
    const dmg = Math.round(
      ((attacker.playerClass.atk / 2) * attacker.playerClass.spd) / 100 +
        attacker.playerClass.int / 9.5 +
        getRandom(1, 8) +
        getRandom(1, 8) -
        defender.playerClass.armor / 2
    );
    const counterAttack = Math.round(
      ((defender.playerClass.atk / 2) * defender.playerClass.spd) / 100 +
        defender.playerClass.int / 9.5 +
        getRandom(1, 8) +
        getRandom(1, 8) +
        getRandom(1, 8) -
        attacker.playerClass.armor / 2
    );
    if (dodge(defender) && !defender.playerClass.onDef) {
      setRandom(getRandom(0, mdjTauntAttacker.length - 1));
      dispatch({
        type: "PLAYER_TAKE_DMG",
        payload: { player: defenderTostring, hitValue: 0 },
      });
      dispatch({ type: "PLAYER_ACTION_STATUS_FAIL" });
      newLog(`${defender.pseudo.toUpperCase()} esquive`);
      newRound(1);
    } else if (dodge(defender) && defender.playerClass.onDef) {
      setRandom(getRandom(0, mdjCounterAttack.length - 1));
      dispatch({
        type: "PLAYER_TAKE_DMG",
        payload: { player: attackerTostring, hitValue: counterAttack },
      });
      dispatch({
        type: "PLAYER_DEFENSE_DOWN",
        payload: { player: defenderTostring },
      });
      dispatch({ type: "PLAYER_ACTION_STATUS_COUNTER_ATTACK" });
      newLog(
        `${defender.pseudo.toUpperCase()} contre attaque et inflie ${counterAttack} dommages`
      );
      newRound(1);
    } else {
      setRandom(getRandom(0, mdjTauntDefender.length - 1));
      if (defender.playerClass.onDef) {
        dispatch({
          type: "PLAYER_DEFENSE_DOWN",
          payload: { player: defenderTostring },
        });
      }
      dispatch({
        type: "PLAYER_TAKE_DMG",
        payload: { player: defenderTostring, hitValue: dmg },
      });

      dispatch({ type: "PLAYER_ACTION_STATUS_HIT" });
      newLog(
        `${attacker.pseudo.toUpperCase()} inflige ${dmg} points de dégâts à ${defender.pseudo.toUpperCase()}`
      );
      newRound(1);
    }
  };

  const onAttackClickP1 = () => {
    if (round % 2 === 1 && round > 0 && canPlay) {
      attackerDefenderStrings("player1", "player2");
      onAttackClick(player1, player2, "player1", "player2");
    }
  };
  const onAttackClickP2 = () => {
    if (round % 2 === 0 && round > 0 && canPlay) {
      attackerDefenderStrings("player2", "player1");
      onAttackClick(player2, player1, "player2", "player1");
    }
  };

  //DEFENSE SKILL//
  const onDefenseClick = (attacker, attackerToString) => {
    if (!attacker.playerClass.onDef) {
      setRandom(getRandom(0, mdjDefense.length - 1)); //mdjDefense array length = 3.
      dispatch({
        type: "PLAYER_DEFENSE_UP",
        payload: { player: attackerToString },
      });
      dispatch({ type: "PLAYER_ACTION_STATUS_DEFENSE" });
      newLog(`${attacker.pseudo.toUpperCase()} lève son bouclier`);
      newRound(1);
    } else {
      setRandom(getRandom(0, mdjAlreadyDef.length - 1)); //mdjAlreadyDef array length = 3.
      dispatch({ type: "PLAYER_ACTION_STATUS_ALREADY_DEFENSE" });
    }
  };

  const onDefenseClickP1 = () => {
    if (round % 2 === 1 && round > 0 && canPlay) {
      attackerDefenderStrings("player1", "player2");
      onDefenseClick(player1, "player1");
    }
  };
  const onDefenseClickP2 = () => {
    if (round % 2 === 0 && round > 0 && canPlay) {
      attackerDefenderStrings("player2", "player1");
      onDefenseClick(player2, "player2");
    }
  };

  //ULTIM SKILL//
  const onUltimClick = (
    attacker,
    defender,
    attackerTostring,
    defenderTostring
  ) => {
    const dmg = Math.round(
      ((attacker.playerClass.atk / 2) * attacker.playerClass.spd) / 100 +
        attacker.playerClass.int / 9.5 +
        getRandom(1, 8) -
        defender.playerClass.armor / 2
    );
    const counterAttack = Math.round(
      ((defender.playerClass.atk / 2) * defender.playerClass.spd) / 100 +
        defender.playerClass.int / 9.5 +
        getRandom(1, 8) +
        getRandom(1, 8) +
        getRandom(1, 8) -
        attacker.playerClass.armor / 2
    );
    if (dodge(defender) && !defender.playerClass.onDef) {
      setRandom(getRandom(0, mdjTauntAttacker.length - 1));
      dispatch({
        type: "PLAYER_TAKE_DMG",
        payload: { player: defenderTostring, hitValue: 0 },
      });
      dispatch({ type: "PLAYER_ACTION_STATUS_FAIL" });
      newLog(`${defender.pseudo.toUpperCase()} esquive`);
      newRound(1);
    } else if (dodge(defender) && defender.playerClass.onDef) {
      setRandom(getRandom(0, mdjCounterAttack.length - 1));
      dispatch({
        type: "PLAYER_TAKE_DMG",
        payload: { player: attackerTostring, hitValue: counterAttack },
      });
      dispatch({
        type: "PLAYER_DEFENSE_DOWN",
        payload: { player: defenderTostring },
      });
      dispatch({ type: "PLAYER_ACTION_STATUS_COUNTER_ATTACK" });
      newLog(
        `${defender.pseudo.toUpperCase()} contre attaque et inflie ${counterAttack} dommages`
      );
      newRound(1);
    } else {
      if (
        attacker.playerClass.className === "mage" ||
        attacker.playerClass.className === "guerrier"
      ) {
        setRandom(getRandom(0, mdjStun.length - 1));
        dispatch({
          type: "PLAYER_TAKE_DMG",
          payload: { player: defenderTostring, hitValue: dmg },
        });
        dispatch({ type: "PLAYER_ACTION_STATUS_MAGE_WAR_ULTIM" });
        dispatch({
          type: "PLAYER_ULTIM_DOWN",
          payload: { player: attackerTostring },
        });
        newLog(
          `${attacker.pseudo.toUpperCase()} assome ${attacker.pseudo.toUpperCase()} et lui inflige ${dmg} dégâts`
        );
        newRound(2);
      } else if (
        attacker.playerClass.className === "voleur" &&
        defender.playerClass.potions > 0
      ) {
        setRandom(getRandom(0, mdjTheft.length - 1));
        dispatch({
          type: "PLAYER_POTION_MODIFICATION",
          payload: { attacker: attackerTostring, defender: defenderTostring },
        });
        dispatch({ type: "PLAYER_ACTION_STATUS_ROGUE_ULTIM" });
        dispatch({
          type: "PLAYER_ULTIM_DOWN",
          payload: { player: attackerTostring },
        });
        newLog(
          `${attacker.pseudo.toUpperCase()} vole une potion à ${attacker.pseudo.toUpperCase()}`
        );
        newRound(1);
      } else if (
        attacker.playerClass.className === "voleur" &&
        defender.playerClass.potions <= 0
      ) {
        setRandom(getRandom(0, mdjNothingToSteal.length - 1));
        dispatch({ type: "PLAYER_ACTION_STATUS_ROGUE_ULTIM_FAIL" });
        dispatch({
          type: "PLAYER_ULTIM_DOWN",
          payload: { player: attackerTostring },
        });
      }
    }
  };

  const onUltimClickP1 = () => {
    if (round % 2 === 1 && round > 0 && canPlay) {
      if (!player1.playerClass.ultimUp) {
        return;
      } else {
        attackerDefenderStrings("player1", "player2");
        onUltimClick(player1, player2, "player1", "player2");
      }
    }
  };
  const onUltimClickP2 = () => {
    if (round % 2 === 0 && round > 0 && canPlay) {
      if (!player2.playerClass.ultimUp) {
        return;
      } else {
        attackerDefenderStrings("player2", "player1");
        onUltimClick(player2, player1, "player2", "player1");
      }
    }
  };

  //POTION SKILL//
  const potionHeal = (attacker, attackerTostring) => {
    if (attacker.playerClass.hp >= 300) {
      dispatch({ type: "PLAYER_ACTION_STATUS_POTION_NOK" });
      setRandom(getRandom(0, mdjPotionNok.length - 1)); //mdjPotionNok array length = 3
    } else if (attacker.playerClass.potions <= 0) {
      setRandom(getRandom(0, mdjNoMorePotion.length - 1)); //mdjNoMorePotion array length = 3
      dispatch({ type: "PLAYER_ACTION_STATUS_POTION_ZERO" });
    } else {
      dispatch({
        type: "PLAYER_POTION_HEAL",
        payload: { player: attackerTostring },
      });
      dispatch({ type: "PLAYER_ACTION_STATUS_POTION_OK" });
      setRandom(getRandom(0, mdjPotionOk.length - 1)); //mdjPotionOk array length = 3
      newLog(`${attacker.pseudo.toUpperCase()} utilise une potion de soin`);
      newRound(1);
    }
  };
  const onPotionClickP1 = () => {
    if (round % 2 === 1 && round > 0 && canPlay) {
      attackerDefenderStrings("player1", "player2");
      potionHeal(player1, "player1");
    }
  };
  const onPotionClickP2 = () => {
    if (round % 2 === 0 && round > 0 && canPlay) {
      attackerDefenderStrings("player2", "player1");
      potionHeal(player2, "player2");
    }
  };

  return (
    <>
      {tutoriel && (
        <div className={mc.tutoriel}>
          <Tutoriel
            player1={player1}
            player2={player2}
            closeTutoriel={closeTutoriel}
            animation={animationTutoriel}
          />
        </div>
      )}
      {/* {winner && ( */}
      <div
        className={
          winner
            ? `${mc.winner} ${mc.winner_shown}`
            : `${mc.winner} ${mc.winner_hidden}`
        }
        style={{ backgroundImage: `url(${arenaImages[bckRandom]})` }}
      >
        <Winner
          player={player1.playerClass.hp <= 0 ? player2 : player1}
          onEndFightButtonClick={onEndFightButtonClick}
          bckImage={arenaImages[bckRandom]}
        />
      </div>
      {/* )} */}
      <div
        className={
          winner || tutoriel
            ? `${mc.container} ${mc.container_low_opacity}`
            : mc.container
        }
        style={{ backgroundImage: `url(${arenaImages[bckRandom]})` }}
      >
        <div className={mc.fightingZone}>
          <div className={mc.top_menu}>
            <div className={mc.life_bars_player1}>
              <LifeBar
                windowWidth={windowWidth}
                playerNumber={1} //determine row-reverse for player1
                player={player1}
              />
            </div>
            <div
              style={{ backgroundImage: `url(${arenaImages[bckRandom]})` }}
              className={mc.top_tv}
            >
              <button onClick={startGame}>
                <p>Clique ici pour commencer</p>
              </button>
              <div
                className={
                  startTv ? `${mc.clean_tv} ${mc.clean_tv_on}` : mc.clean_tv
                }
              ></div>
              {playersClickOnstartGame && (
                <div className={mc.myTV}>
                  <Tv round={round} player1={player1} player2={player2} />
                </div>
              )}
            </div>

            <div className={mc.life_bars_player2}>
              <LifeBar
                windowWidth={windowWidth}
                playerNumber={2} //determine row-reverse for player2
                player={player2}
              />
            </div>
          </div>
          <div className={mc.mdj_menu}>
            <MdjScene
              player1={player1}
              player2={player2}
              attacker={attacker === "player1" ? player1 : player2}
              defender={defender === "player1" ? player1 : player2}
              string={
                !playersClickOnstartGame && random !== null
                  ? mdjWelcome[random]
                  : playersClickOnstartGame &&
                    playerActionStatus === "fightStart"
                  ? mdjFightWillStart
                  : playersClickOnstartGame && playerActionStatus === "hit"
                  ? mdjTauntDefender[random]
                  : playersClickOnstartGame && playerActionStatus === "fail"
                  ? mdjTauntAttacker[random]
                  : playersClickOnstartGame && playerActionStatus === "potionOk"
                  ? mdjPotionOk[random]
                  : playersClickOnstartGame &&
                    playerActionStatus === "potionNok"
                  ? mdjPotionNok[random]
                  : playersClickOnstartGame &&
                    playerActionStatus === "potionZero"
                  ? mdjNoMorePotion[random]
                  : playerActionStatus === "defense"
                  ? mdjDefense[random]
                  : playerActionStatus === "alreadyDefense"
                  ? mdjAlreadyDef[random]
                  : playerActionStatus === "counterAttack"
                  ? mdjCounterAttack[random]
                  : playerActionStatus === "stun"
                  ? mdjStun[random]
                  : playerActionStatus === "theft"
                  ? mdjTheft[random]
                  : playerActionStatus === "nothingToSteal"
                  ? mdjNothingToSteal[random]
                  : ""
              }
              playerActionStatus={playerActionStatus}
            />
          </div>
          <div className={mc.fighting_menu}>
            <Fight
              windowWidth={windowWidth}
              player1={player1}
              player2={player2}
              logs={logs}
              onAttackClickP1={onAttackClickP1}
              onDefenseClickP1={onDefenseClickP1}
              onUltimClickP1={onUltimClickP1}
              onPotionClickP1={onPotionClickP1}
              onAttackClickP2={onAttackClickP2}
              onDefenseClickP2={onDefenseClickP2}
              onUltimClickP2={onUltimClickP2}
              onPotionClickP2={onPotionClickP2}
              round={round}
              attacker={attacker}
              playerActionStatus={playerActionStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FightScene;
