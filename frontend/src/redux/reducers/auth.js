import CONSTANTS from "../constants";

export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case CONSTANTS.auth.AUTH:
      localStorage.setItem("authData", JSON.stringify(action?.payload));
      return { ...state, authData: action?.payload };
    case CONSTANTS.auth.LOGOUT:
      return { ...state, authData: null };
    default:
      return state;
  }
};
