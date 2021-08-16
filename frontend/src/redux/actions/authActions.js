import CONSTANTS from "../constants";
import * as api from "../../api";
export const authAction = (data) => async (dispatch) => {
  //for google
  try {
    dispatch({ type: CONSTANTS.auth.AUTH, payload: data });
  } catch (error) {}
};

export const logOutAction = () => async (dispatch) => {
  try {
    dispatch({ type: CONSTANTS.auth.LOGOUT });
    localStorage.clear();
  } catch (error) {}
};

export const signInAction = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);
    dispatch({ type: CONSTANTS.auth.AUTH, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};

export const signUpAction = (userData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(userData);
    dispatch({ type: CONSTANTS.auth.AUTH, payload: data });
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};
