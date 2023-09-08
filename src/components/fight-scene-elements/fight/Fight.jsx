import mc from "./fight.module.scss";
//components//
import FightPlayerMenu from "../fight-player-menu/FightPlayerMenu";
import LogsMenu from "../logsMenu/LogsMenu";

const Fight = ({
  windowWidth,
  player1,
  player2,
  logs,
  onAttackClickP1,
  onDefenseClickP1,
  onUltimClickP1,
  onPotionClickP1,
  onAttackClickP2,
  onDefenseClickP2,
  onUltimClickP2,
  onPotionClickP2,
  round,
  attacker,
  playerActionStatus,
}) => {
  return (
    <div className={mc.container}>
      <div className={mc.player1}>
        <FightPlayerMenu
          windowWidth={windowWidth}
          playerNumber={1}
          player={player1}
          onAttackClick={onAttackClickP1}
          onDefenseClick={onDefenseClickP1}
          onUltimClick={onUltimClickP1}
          onPotionClick={onPotionClickP1}
          round={round > 0 && round % 2 === 1}
          playerTakeDmg={
            (round > 0 &&
              round % 2 === 0 &&
              attacker === "player2" &&
              (playerActionStatus === "hit" ||
                playerActionStatus === "stun")) ||
            (round > 0 &&
              round % 2 === 1 &&
              attacker === "player1" &&
              playerActionStatus === "counterAttack")
          }
          playerDodge={
            round > 0 &&
            round % 2 === 0 &&
            attacker === "player2" &&
            (playerActionStatus === "fail" ||
              playerActionStatus === "counterAttack")
          }
          playerStunned={
            round > 0 &&
            round % 2 === 0 &&
            attacker === "player2" &&
            playerActionStatus === "stun"
          }
          playerTakePotion={
            round > 0 &&
            round % 2 === 1 &&
            attacker === "player1" &&
            playerActionStatus === "potionOk"
          }
        />
      </div>
      {/* <div className={mc.logs}>
        <LogsMenu logs={logs} player1={player1} player2={player2} />
      </div> */}
      <div className={mc.player2}>
        <FightPlayerMenu
          windowWidth={windowWidth}
          playerNumber={2}
          player={player2}
          onAttackClick={onAttackClickP2}
          onDefenseClick={onDefenseClickP2}
          onUltimClick={onUltimClickP2}
          onPotionClick={onPotionClickP2}
          round={round > 0 && round % 2 === 0}
          playerTakeDmg={
            (round > 0 &&
              round % 2 === 1 &&
              attacker === "player1" &&
              (playerActionStatus === "hit" ||
                playerActionStatus === "stun")) ||
            (round > 0 &&
              round % 2 === 0 &&
              attacker === "player2" &&
              playerActionStatus === "counterAttack")
          }
          playerDodge={
            round % 2 === 1 &&
            attacker === "player1" &&
            (playerActionStatus === "fail" ||
              playerActionStatus === "counterAttack")
          }
          playerStunned={
            round > 0 &&
            round % 2 === 1 &&
            attacker === "player1" &&
            playerActionStatus === "stun"
          }
          playerTakePotion={
            round > 0 &&
            round % 2 === 0 &&
            attacker === "player2" &&
            playerActionStatus === "potionOk"
          }
        />
      </div>
    </div>
  );
};

export default Fight;
