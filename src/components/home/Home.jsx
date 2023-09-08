import mc from "./home.module.scss";
import { useSelector } from "react-redux";
//components//
import NavBar from "../nav-bar/NavBar";
import Main from "../main/Main";

const Home = () => {
  const { fightStart, animationFightStart } = useSelector((store) => {
    return {
      fightStart: store.modificatorsReducer.fightStart,
      animationFightStart: store.animationsReducer.animationFightStart,
    };
  });
  return (
    <div className={mc.container}>
      {!fightStart && (
        <nav>
          <NavBar />
        </nav>
      )}
      <main>
        <Main
          fightStart={fightStart}
          animationFightStart={animationFightStart}
        />
      </main>
    </div>
  );
};

export default Home;
