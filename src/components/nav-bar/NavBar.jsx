import mc from "./nav-bar.module.scss";

const NavBar = () => {
  return (
    <div className={mc.container}>
      <h1>MERLIN' ARENAS</h1>
      <div className={mc.settings}>{/* <button></button> */}</div>
    </div>
  );
};

export default NavBar;
