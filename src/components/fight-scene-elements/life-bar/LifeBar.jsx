import mc from "./life-bar.module.scss";
//utils//
import { firstLetterUpper } from "../../../utils/firstLetterCapital";
//images//
import rogueIcon from "../../../images/rogueIcon.jpeg";
import mageIcon from "../../../images/mageIcon.jpeg";
import warriorIcon from "../../../images/warriorIcon.jpeg";

const LifeBar = ({ windowWidth, playerNumber, player }) => {
  return (
    <div
      style={{ "--class-color": `${player.playerClass.color}` }}
      className={
        playerNumber === 1
          ? `${mc.container} ${mc.container_player1}`
          : playerNumber === 2
          ? `${mc.container} ${mc.container_player2}`
          : mc.container
      }
    >
      {windowWidth > 900 && (
        <div className={mc.player_class}>
          <div className={mc.class_icon}>
            <img
              src={
                player.playerClass.className === "voleur"
                  ? rogueIcon
                  : player.playerClass.className === "mage"
                  ? mageIcon
                  : warriorIcon
              }
              alt={`{icône de la classe ${player.playerClass.className}`}
              draggable="false"
            />
          </div>
        </div>
      )}

      <div className={mc.player_life_pseudo}>
        <div className={mc.pseudo}>
          <span>{firstLetterUpper(player.pseudo)}</span>
        </div>
        <div className={mc.life_bar}>
          <div className={mc.life}>
            <span>
              {player.playerClass.hp >= 0 ? `${player.playerClass.hp} PV` : `0`}{" "}
            </span>
          </div>
          <div
            className={
              player.playerClass.hp <= 25
                ? `${mc.life_remaining} ${mc.life_remaing_red}`
                : player.playerClass.hp <= 75
                ? `${mc.life_remaining} ${mc.life_remaing_orange}`
                : `${mc.life_remaining} ${mc.life_remaing_green}`
            }
            style={{ "--remaining-life": `${player.playerClass.hp / 1.5}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LifeBar;
