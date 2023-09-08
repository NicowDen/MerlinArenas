import mc from "./fighting-button.module.scss";

const FightingButton = ({ onFightStartButtonClick }) => {
  return (
    <div className={mc.container}>
      <button onClick={onFightStartButtonClick}>Fight</button>
    </div>
  );
};

export default FightingButton;
