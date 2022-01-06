import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formdata, navigate) => async (dispatch) => {
  // Remember this sintax is to work redux thunk
  try {
    // login the user...
    const { data } = await api.signIn(formdata);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formdata, navigate) => async (dispatch) => {
  // Remember this sintax is to work redux thunk
  try {
    // signup the user...
    const { data } = await api.signUp(formdata);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
