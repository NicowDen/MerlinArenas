const sizeMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === "SELECT_WORD") {
    next({ type: "TOGGLE" });
  }

  // if (
  //   action.type === "TOGGLE" &&
  //   action.payload.element.className.includes("green-block")
  // ) {
  //   return next({ type: "" });
  // }

  return next(action);
};

export default sizeMiddleware;
