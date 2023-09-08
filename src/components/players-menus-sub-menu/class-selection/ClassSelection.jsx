import mc from "./class-selection.module.scss";
import { classes } from "../../../constants/classes";
//utils//
import { firstLetterUpper } from "../../../utils/firstLetterCapital";

const ClassSelection = ({
  pseudo,
  onEditPseudoClick,
  onEditClassClick,
  onClickplayerClassSelection,
  onClassButtonSelectionClick,
  classPlayerChoice,
  classColor,
  animationOnClassValidation,
}) => {
  return (
    <div className={mc.container}>
      <div className={mc.pseudo_validate}>
        <h3>CHOISIS TA CLASSE</h3>
        <button
          className={mc.tooltip_btn_pseudo}
          data-tooltip="Changer de pseudo"
        >
          <span onClick={onEditPseudoClick}>{firstLetterUpper(pseudo)}</span>
        </button>
      </div>
      {!onClassButtonSelectionClick ? (
        <div className={mc.class_selection}>
          <ul>
            {classes.map((el, i) => (
              <li
                className={
                  !animationOnClassValidation
                    ? `${mc.animate_slide_bottom_fade_in}`
                    : `${mc.animate_slide_bottom}`
                }
                key={i}
                style={{
                  "--class-color": el.color,
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <button onClick={() => onClickplayerClassSelection(el)}>
                  {firstLetterUpper(el.className)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={mc.class_selection}>
          <div className={mc.class_selected}>
            <button
              onClick={onEditClassClick}
              className={mc.tooltip_btn_class}
              data-tooltip="Changer de classe"
            >
              <span
                className={mc.class_player_selected}
                style={{ "--class-color": classColor }}
              >
                {firstLetterUpper(classPlayerChoice)}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSelection;
