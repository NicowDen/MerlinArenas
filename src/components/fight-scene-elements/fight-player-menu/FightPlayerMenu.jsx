import mc from "./fight-player-menu.module.scss";
import { useEffect, useState } from "react";
//images//
import rogueImgP1 from "../../../images/rogueImgP1.png";
import mageImgP1 from "../../../images/mageImgP1.png";
import warriorImgP1 from "../../../images/warriorImgP1.png";
import rogueImgP2 from "../../../images/rogueImgP2.png";
import mageImgP2 from "../../../images/mageImgP2.png";
import warriorImgP2 from "../../../images/warriorImgP2.png";
//images fight icons//
//attacks//
import mageAtk from "../../../images/atks/mageAtk.jpeg";
import rogueAtk from "../../../images/atks/rogueAtk.jpeg";
import warriorAtk from "../../../images/atks/warriorAtk.jpeg";
//defense//
import shield from "../../../images/atks/shield.jpeg";
//utltims//
import mageUltim from "../../../images/atks/mageFreeze.jpeg";
import rogueUltim from "../../../images/atks/pickpocketRogue.jpeg";
import warriorUltim from "../../../images/atks/warriorStun.jpeg";
//potions//
import potion from "../../../images/atks/potion.jpeg";

const FightPlayerMenu = ({
  windowWidth,
  playerNumber,
  player,
  onAttackClick,
  onDefenseClick,
  onUltimClick,
  onPotionClick,
  round,
  roundZero,
  playerTakeDmg,
  playerDodge,
  playerTakePotion,
  playerStunned,
}) => {
  const [img, setImg] = useState();

  useEffect(() => {
    if (playerNumber === 1) {
      if (player.playerClass.className === "voleur") {
        setImg(rogueImgP1);
      } else if (player.playerClass.className === "mage") {
        setImg(mageImgP1);
      } else {
        setImg(warriorImgP1);
      }
    } else if (playerNumber === 2) {
      if (player.playerClass.className === "voleur") {
        setImg(rogueImgP2);
      } else if (player.playerClass.className === "mage") {
        setImg(mageImgP2);
      } else {
        setImg(warriorImgP2);
      }
    }
  }, [
    playerNumber,
    player,
    rogueImgP1,
    mageImgP1,
    warriorImgP1,
    rogueImgP2,
    mageImgP2,
    warriorImgP2,
  ]);

  return (
    <div
      className={
        roundZero
          ? mc.container
          : round
          ? `${mc.container} ${mc.container_green}`
          : `${mc.container} ${mc.container_red}`
      }
    >
      <div className={mc.player_menu}>
        <div>
          <button
            className={mc.attack}
            onClick={() => onAttackClick(playerNumber)}
          >
            {windowWidth > 500 && (
              <span className={mc.tooltip_content}>
                Inflige des dégâts MODÉRÉS à votre adversaire
              </span>
            )}
            <img
              className={round ? "" : `${mc.low_opacity}`}
              src={
                player.playerClass.className === "voleur"
                  ? rogueAtk
                  : player.playerClass.className === "mage"
                  ? mageAtk
                  : warriorAtk
              }
              alt={`{image ${player.playerClass.className}`}
              draggable="false"
            />
          </button>

          <button
            className={
              player.playerClass.onDef
                ? `${mc.defense} ${mc.defense_low_opacity}`
                : mc.defense
            }
            onClick={() => onDefenseClick(playerNumber)}
          >
            {windowWidth > 500 && (
              <span className={mc.tooltip_content}>
                Augmente vos chances d'ESQUIVER la prochaine attaque et une
                FAIBLE chance de contre-attaquer en infligeant d'IMPORTANTS
                dégâts. (DURÉE=1TOUR)
              </span>
            )}
            <img
              className={round ? "" : `${mc.low_opacity}`}
              src={shield}
              alt="image d'un bouclier"
              draggable="false"
            />
          </button>

          <button
            className={
              player.playerClass.ultimUp
                ? mc.ultim
                : `${mc.ultim} ${mc.ultim_low_opacity}`
            }
            onClick={() => onUltimClick(playerNumber)}
          >
            {player.playerClass.ultimUp && (
              <span className={mc.tooltip_content}>
                {`${
                  player.playerClass.className === "voleur"
                    ? player.playerClass.ultimUp
                      ? "A une grande chance de voler une POTION à votre adversaire (s'il en possède au moins 1) (1 CHARGE)"
                      : "Indisponible"
                    : player.playerClass.className === "mage"
                    ? player.playerClass.ultimUp
                      ? "A une grande chance de geler votre adversaire, d'infliger des dégâts FAIBLES et l'empêcher de jouer pendant 1 TOURS. (1 CHARGE)"
                      : "Indisponible"
                    : player.playerClass.ultimUp
                    ? "A une grande chance d'assomer votre adversaire, d'infliger des dégâts FAIBLES et l'empêcher de jouer pendant 1 TOURS. (1 CHARGE)"
                    : "Indisponible"
                }`}
              </span>
            )}

            <img
              className={round ? "" : `${mc.low_opacity}`}
              src={
                player.playerClass.className === "voleur"
                  ? rogueUltim
                  : player.playerClass.className === "mage"
                  ? mageUltim
                  : warriorUltim
              }
              alt="image d'une potion de soin"
              draggable="false"
            />
          </button>

          <button
            className={mc.potion}
            onClick={() => onPotionClick(playerNumber)}
          >
            {windowWidth > 500 && (
              <span className={mc.tooltip_content}>
                Rend entre 10% et 20% points de vies
              </span>
            )}
            <img
              className={round ? "" : `${mc.low_opacity}`}
              src={potion}
              alt="image d'une potion de soin"
              draggable="false"
            />

            <span
              className={
                round
                  ? `${mc.potions_counter}`
                  : `${mc.potions_counter} ${mc.low_opacity} `
              }
            >
              {player.playerClass.potions}
            </span>
          </button>
        </div>
      </div>

      <div
        className={
          playerTakeDmg
            ? `${mc.player_character} adaptive-img-contain ${mc.player_character_take_it}`
            : playerDodge
            ? playerNumber === 1
              ? `${mc.player_character} adaptive-img-contain ${mc.player1_character_dodge}`
              : `${mc.player_character} adaptive-img-contain ${mc.player2_character_dodge}`
            : playerTakePotion
            ? `${mc.player_character} adaptive-img-contain ${mc.player_character_take_potion}`
            : `${mc.player_character} adaptive-img-contain`
        }
      >
        <span>
          <img
            src={img}
            alt={`{image ${player.playerClass.className}`}
            draggable="false"
          />
        </span>
        {playerStunned && <div className={mc.sleeping}>ZzZzZ</div>}
      </div>
    </div>
  );
};

export default FightPlayerMenu;
