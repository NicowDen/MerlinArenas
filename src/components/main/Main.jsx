import mc from "./main.module.scss";
//components//
import PlayersMenu from "../players-menus/PlayersMenus";
import FightScene from "../fight-scene/FightScene";

const Main = ({ fightStart, animationFightStart }) => {
  return (
    <div className={mc.container}>
      {fightStart ? (
        <div
          className={
            !animationFightStart
              ? `${mc.fight_scene} ${mc.animate_slide_left}`
              : `${mc.fight_scene} ${mc.animate_right_left_fade_in}`
          }
        >
          <FightScene />
        </div>
      ) : (
        <div
          className={
            animationFightStart
              ? `${mc.player_menu} ${mc.animate_slide_right}`
              : `${mc.player_menu} ${mc.animate_right_left_fade_in}`
          }
        >
          <PlayersMenu />
        </div>
      )}
    </div>
  );
};

export default Main;
