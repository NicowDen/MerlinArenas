import mc from "./pseudo-inputs.module.scss";

const PseudoInputs = ({
  inputValue,
  player,
  enterValidation,
  pseudoValidation,
  pseudoInTitle,
  inputValidationError,
  updatePseudo,
}) => {
  // Fonction de mise à jour de la valeur locale de l'input
  const handleInputChange = (e) => {
    // Appel de l'ancienne fonction updatePseudo si nécessaire
  };

  return (
    <div className={mc.container}>
      <div className={mc.h3}>
        <h3>CHOISIS TON PSEUDO</h3>
        <span className={mc.player1_2}>{pseudoInTitle}</span>
      </div>

      <div className={mc.container_input}>
        <input
          className={
            !inputValidationError ? mc.input : `${mc.input} input_empty`
          }
          required={true}
          type="text"
          name="pseudo"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => updatePseudo(player, e.target.value)}
          onKeyDown={enterValidation}
          // onBlur={pseudoValidation}
        />
        <label>
          {"Ton pseudo".split("").map((el, i) => (
            <span key={i} style={{ transitionDelay: `${i * 30}ms` }}>
              {el}
            </span>
          ))}
        </label>
      </div>

      <button
        className={
          inputValue.trim().length > 0 ? mc.button_shown : mc.button_hidden
        }
        onClick={() => pseudoValidation(inputValue)}
      >
        OK
      </button>
    </div>
  );
};

export default PseudoInputs;
