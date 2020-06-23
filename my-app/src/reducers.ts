import { handleActions } from "redux-actions";
import { IState, ActionTypes } from "./interfaces";

const defaultState: IState = { catalogue: [], cart: [] };

export const rootReducer = handleActions<
  IState,
  { type: string; name?: string }
>(
  {
    [ActionTypes.ADD_ONE_OF]: (state, { payload: { name = "" } }) => {
      if (name) {
        return {
          catalogue: state.catalogue,
          cart: [...state.cart, name],
        };
      } else {
        return state;
      }
    },
    [ActionTypes.REMOVE_ONE_OF]: (state, { payload: { name = "" } }) => {
      if (name) {
        const index = state.cart.indexOf(name);
        return {
          catalogue: state.catalogue,
          cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
        };
      } else {
        return state;
      }
    },
    [ActionTypes.REMOVE_ALL_OF]: (state, { payload: { name = "" } }) => {
      if (name) {
        return {
          catalogue: state.catalogue,
          cart: state.cart.filter((item) => item !== name),
        };
      } else {
        return state;
      }
    },
    [ActionTypes.REMOVE_ALL]: (state, _) => {
      return { catalogue: state.catalogue, cart: [] };
    },
  },
  defaultState
);
