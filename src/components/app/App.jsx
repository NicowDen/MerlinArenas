import { useDispatch } from "react-redux";
import { useEffect } from "react";

//components
import Home from "../home/Home";

const App = () => {
  const dispatch = useDispatch();

  //==get window width==/
  useEffect(() => {
    const windowSize = window.innerWidth;
    dispatch({
      type: "GET_WINDOW_WIDTH",
      payload: { wWidth: windowSize },
    });
  }, []);

  const getScreenSize = () => {
    const windowSize = window.innerWidth;

    dispatch({
      type: "GET_WINDOW_WIDTH",
      payload: { wWidth: windowSize },
    });
  };

  useEffect(() => {
    const handleWindowResize = () => {
      getScreenSize();
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //==get window height==/
  useEffect(() => {
    const windowHeight = window.innerHeight;
    dispatch({
      type: "GET_WINDOW_HEIGHT",
      payload: { wHeight: windowHeight },
    });
  }, []);

  const getScreenHeight = () => {
    const windowHeight = window.innerHeight;

    dispatch({
      type: "GET_WINDOW_HEIGHT",
      payload: { wHeight: windowHeight },
    });
  };

  useEffect(() => {
    const handleWindowResize = () => {
      getScreenHeight();
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return <Home />;
};

export default App;
