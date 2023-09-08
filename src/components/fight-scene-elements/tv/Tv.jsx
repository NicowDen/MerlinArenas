import mc from "./tv.module.scss";

const Tv = ({ round, player1, player2 }) => {
  return (
    <div className={mc.container}>
      {/* <div className={mc.dice_loading}>
        <span>Le maître du jeu lance le dé...</span>
      </div> */}
      <div className={mc.rounds}>
        <span>
          {round !== 0 && round % 2 === 1 ? (
            <>
              À{" "}
              <span
                className={mc.players}
                style={{ "--classColor": player1.playerClass.color }}
              >
                {player1.pseudo.toUpperCase()}
              </span>{" "}
              de jouer
            </>
          ) : round !== 0 && round % 2 === 0 ? (
            <>
              À{" "}
              <span
                className={mc.players}
                style={{ "--classColor": player2.playerClass.color }}
              >
                {player2.pseudo.toUpperCase()}
              </span>{" "}
              de jouer
            </>
          ) : (
            ""
          )}
        </span>
      </div>
    </div>
  );
};

export default Tv;
