import { handleActions } from "redux-actions";
import { IState, ActionTypes, AsyncSuffix } from "./interfaces";

const {
  ADD_ONE_OF,
  REMOVE_ONE_OF,
  REMOVE_ALL_OF,
  REMOVE_ALL,
  FETCH_DATA,
} = ActionTypes;
const { FULFILLED } = AsyncSuffix;

const defaultState: IState = {
  catalogue: [],
  cart: [],
};

export const rootReducer = handleActions<IState, any>(
  {
    [ADD_ONE_OF]: (state, { payload: { name } }) => {
      if (name) {
        return {
          ...state,
          catalogue: state.catalogue,
          cart: [...state.cart, name],
        };
      } else {
        return state;
      }
    },
    [REMOVE_ONE_OF]: (state, { payload: { name } }) => {
      if (name) {
        const index = state.cart.indexOf(name);
        return {
          ...state,
          catalogue: state.catalogue,
          cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
        };
      } else {
        return state;
      }
    },
    [REMOVE_ALL_OF]: (state, { payload: { name } }) => {
      if (name) {
        return {
          ...state,
          catalogue: state.catalogue,
          cart: state.cart.filter((item) => item !== name),
        };
      } else {
        return state;
      }
    },
    [REMOVE_ALL]: (state, _) => {
      return { ...state, catalogue: state.catalogue, cart: [] };
    },
    [`${FETCH_DATA}${FULFILLED}`]: (state, { payload: { data } }) => {
      return { ...state, catalogue: data, cart: state.cart };
    },
  },
  defaultState
);
