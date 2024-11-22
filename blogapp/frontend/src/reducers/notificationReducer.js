const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "setted":
      return action.payload;
    case "clear":
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, type, timeout) => {
  return (dispatch) => {
    dispatch({
      type: "setted",
      payload: {
        message,
        type,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "clear",
      });
    }, timeout * 1000);
  };
};

export default notificationReducer;
