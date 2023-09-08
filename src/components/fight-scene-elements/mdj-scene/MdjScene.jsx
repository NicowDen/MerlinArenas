import mc from "./mdj-scene.module.scss";
//images//
import mdjImg from "../../../images/Mdj.png";

const MdjScene = ({
  player1,
  player2,
  attacker,
  defender,
  string,
  playerActionStatus,
}) => {
  return (
    <div className={mc.container}>
      <div
        className={
          playerActionStatus === "hit" ||
          playerActionStatus === "potionNok" ||
          playerActionStatus === "potionOk" ||
          playerActionStatus === "defense" ||
          playerActionStatus === "counterAttack" ||
          playerActionStatus === "stun"
            ? `${mc.mdj_position} adaptive-img-contain ${mc.mdj_position_laugh}`
            : playerActionStatus === "fail" ||
              playerActionStatus === "potionZero" ||
              playerActionStatus === "alreadyDefense" ||
              playerActionStatus === "theft"
            ? `${mc.mdj_position} adaptive-img-contain ${mc.mdj_position_angry}`
            : `${mc.mdj_position} adaptive-img-contain`
        }
      >
        <span>
          <img src={mdjImg} alt="Image du maître de jeu" draggable="false" />
        </span>
      </div>

      <div className={mc.mdj_dialogs}>
        <p>
          {string.split(" ").map((el, i) => {
            if (el === "${player1}") {
              return (
                <span
                  className={mc.player}
                  key={i}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    "--classColor": `${player1.playerClass.color}`,
                  }}
                >
                  {player1.pseudo.toUpperCase()}
                </span>
              );
            } else if (el === "${player2}") {
              return (
                <span
                  className={mc.player}
                  key={i}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    "--classColor": `${player2.playerClass.color}`,
                  }}
                >
                  {player2.pseudo.toUpperCase()}
                </span>
              );
            } else if (el === "${attacker}") {
              return (
                <span
                  className={mc.player}
                  key={i}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    "--classColor": `${attacker.playerClass.color}`,
                  }}
                >
                  {attacker.pseudo.toUpperCase()}
                </span>
              );
            } else if (el === "${defender}") {
              return (
                <span
                  className={mc.player}
                  key={i}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    "--classColor": `${defender.playerClass.color}`,
                  }}
                >
                  {defender.pseudo.toUpperCase()}
                </span>
              );
            } else {
              return (
                <span
                  key={i}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {el}
                </span>
              );
            }
          })}
        </p>
      </div>
    </div>
  );
};

export default MdjScene;
