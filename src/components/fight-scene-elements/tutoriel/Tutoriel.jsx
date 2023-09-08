import mc from "./tutoriel.module.scss";
import { useEffect, useState } from "react";
import { tutorielWelcome } from "../../../constants/tutoriel";
import { tutoriel1 } from "../../../constants/tutoriel";
import { tutoriel2Title } from "../../../constants/tutoriel";
import { tutoriel2_1 } from "../../../constants/tutoriel";
import { tutoriel2_2 } from "../../../constants/tutoriel";
import { tutoriel3Title } from "../../../constants/tutoriel";
import { tutoriel3_1 } from "../../../constants/tutoriel";

const Tutoriel = ({ player1, player2, closeTutoriel, animation }) => {
  const [animTitle, setAnimTitle] = useState(false);
  const [animTutoriel1, setAnimTutoriel1] = useState(false);
  const [animTutoriel2Title, setAnimTutoriel2title] = useState(false);
  const [animTutoriel2_1, setAnimTutoriel2_1] = useState(false);
  const [animTutoriel2_2, setAnimTutoriel2_2] = useState(false);
  const [animTutoriel3Title, setAnimTutoriel3title] = useState(false);
  const [animTutoriel3_1, setAnimTutoriel3_1] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [transition, setTransiton] = useState(0.1);
  const [swapTestButtonHide, setSwapTextButtonHide] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimTitle(true);
    }, 500);
    setTimeout(() => {
      setAnimTutoriel1(true);
    }, 1000);
    setTimeout(() => {
      setAnimTutoriel2title(true);
    }, 3800);
    setTimeout(() => {
      setAnimTutoriel2_1(true);
    }, 4500);
    setTimeout(() => {
      setAnimTutoriel2_2(true);
    }, 9000);
    setTimeout(() => {
      setAnimTutoriel3title(true);
    }, 17000);
    setTimeout(() => {
      setAnimTutoriel3_1(true);
    }, 13000);
    setTimeout(() => {
      setSwapTextButtonHide(true);
    }, 17500);
  }, []);

  const stopTextDisplayAnimation = () => {
    setOpacity(1);
    setTransiton(0);
    setAnimTutoriel1(true);
    setAnimTutoriel2title(true);
    setAnimTutoriel2_1(true);
    setAnimTutoriel2_2(true);
    setAnimTutoriel3title(true);
    setAnimTutoriel3_1(true);
    setSwapTextButtonHide(true);
  };

  return (
    <div
      className={
        animation
          ? `${mc.container} ${mc.container_hide}`
          : `${mc.container} ${mc.container_show}`
      }
    >
      {animTitle && (
        <div className={mc.title}>
          {tutorielWelcome.split(" ").map((el, i) => {
            if (el === "${player1}") {
              return (
                <h3 key={i}>
                  <span
                    style={{
                      animationDelay: `${i * transition}s`,
                      color: `${player1.playerClass.color}`,
                      "--opacity": opacity,
                    }}
                  >
                    {player1.pseudo.toUpperCase()}
                  </span>
                </h3>
              );
            } else if (el === "${player2}") {
              return (
                <h3 key={i}>
                  <span
                    style={{
                      animationDelay: `${i * transition}s`,
                      color: `${player2.playerClass.color}`,
                      "--opacity": opacity,
                    }}
                  >
                    {player2.pseudo.toUpperCase()}
                  </span>
                </h3>
              );
            } else {
              return (
                <h3 key={i}>
                  <span
                    style={{
                      animationDelay: `${i * transition}s`,
                      "--opacity": opacity,
                    }}
                  >
                    {el}
                  </span>
                </h3>
              );
            }
          })}
        </div>
      )}
      <div className={mc.tutoriel_content}>
        {animTutoriel1 && (
          <div className={mc.tutoriel_intro}>
            {tutoriel1.split(" ").map((el, i) => {
              return (
                <p key={i}>
                  <span
                    style={{
                      animationDelay: `${i * transition}s`,
                      "--opacity": opacity,
                    }}
                  >
                    {el}
                  </span>
                </p>
              );
            })}
          </div>
        )}
        <div className={mc.tutoriel_dices}>
          {animTutoriel2Title && (
            <div className={mc.tutoriel_dices_title}>
              {tutoriel2Title.split(" ").map((el, i) => {
                return (
                  <h3 key={i}>
                    <span
                      style={{
                        animationDelay: `${i * transition}s`,
                        "--opacity": opacity,
                      }}
                    >
                      {el}
                    </span>
                  </h3>
                );
              })}
            </div>
          )}
          {animTutoriel2_1 && (
            <div>
              {tutoriel2_1.split(" ").map((el, i) => {
                return (
                  <p key={i}>
                    <span
                      style={{
                        animationDelay: `${i * transition}s`,
                        "--opacity": opacity,
                      }}
                    >
                      {el}
                    </span>
                  </p>
                );
              })}
            </div>
          )}
          {animTutoriel2_2 && (
            <div>
              {tutoriel2_2.split(" ").map((el, i) => {
                if (el === "${dés20}") {
                  return (
                    <p key={i}>
                      <span
                        style={{
                          animationDelay: `${i * transition}s`,
                          "--opacity": opacity,
                        }}
                        className={mc.des}
                      >
                        {"DÉS 20"}
                      </span>
                    </p>
                  );
                } else if (el === "${dés8}") {
                  return (
                    <p key={i}>
                      <span
                        style={{
                          animationDelay: `${i * transition}s`,
                          "--opacity": opacity,
                        }}
                        className={mc.des}
                      >
                        {"DÉS 8"}
                      </span>
                    </p>
                  );
                } else {
                  return (
                    <p key={i}>
                      <span
                        style={{
                          animationDelay: `${i * transition}s`,
                          "--opacity": opacity,
                        }}
                      >
                        {el}
                      </span>
                    </p>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className={mc.tutoriel_actions}>
          {animTutoriel3Title && (
            <div className={mc.tutoriel_actions_title}>
              {tutoriel3Title.split(" ").map((el, i) => {
                return (
                  <h3 key={i}>
                    <span
                      style={{
                        animationDelay: `${i * transition}s`,
                        "--opacity": opacity,
                      }}
                    >
                      {el}
                    </span>
                  </h3>
                );
              })}
            </div>
          )}
          {animTutoriel3_1 && (
            <div>
              {tutoriel3_1.split(" ").map((el, i) => {
                if (el === "${faibles},") {
                  return (
                    <p key={i}>
                      <span
                        className={mc.faibles}
                        style={{
                          animationDelay: `${i * transition}s`,
                          "--opacity": opacity,
                        }}
                      >
                        faibles,
                      </span>
                    </p>
                  );
                } else if (el === "${modérés}") {
                  return (
                    <p key={i}>
                      <span
                        className={mc.moderes}
                        style={{
                          animationDelay: `${i * transition}s`,
                          "--opacity": opacity,
                        }}
                      >
                        modérés
                      </span>
                    </p>
                  );
                } else if (el === "${importants}.") {
                  return (
                    <p key={i}>
                      <span
                        className={mc.importants}
                        style={{
                          animationDelay: `${i * transition}s`,
                          "--opacity": opacity,
                        }}
                      >
                        importants.
                      </span>
                    </p>
                  );
                } else if (el === "${dés8}") {
                  return (
                    <p key={i}>
                      <span
                        className={mc.des}
                        style={{
                          animationDelay: `${i * transition}s`,
                          "--opacity": opacity,
                        }}
                      >
                        DÉS 8
                      </span>
                    </p>
                  );
                } else {
                  return (
                    <p key={i}>
                      <span
                        style={{
                          animationDelay: `${i * transition}s`,
                          "--opacity": opacity,
                        }}
                      >
                        {el}
                      </span>
                    </p>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      <div
        className={
          !swapTestButtonHide
            ? mc.stop_animation_button
            : `${mc.stop_animation_button} ${mc.stop_animation_button_hidden}`
        }
      >
        <button onClick={stopTextDisplayAnimation}>Passer</button>
      </div>

      <div className={mc.confirmation}>
        <button onClick={closeTutoriel}>OK</button>
      </div>
    </div>
  );
};

export default Tutoriel;
