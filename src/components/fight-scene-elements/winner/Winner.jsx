import mc from "./winnner.module.scss";

const Winner = ({ player, onEndFightButtonClick }) => {
  return (
    <div className={mc.container}>
      <div>
        <h3>
          <span style={{ color: `${player.playerClass.color}` }}>
            {player.pseudo.toUpperCase()}
          </span>
          <span>remporte ce duel !</span>
        </h3>
        <button onClick={onEndFightButtonClick}>OK</button>
      </div>
    </div>
  );
};

export default Winner;
