import { createActions } from "redux-actions";
import { IProduct, ActionTypes } from "./interfaces";

export const { addOneOf, removeOneOf, removeAllOf, removeAll } = createActions({
  [ActionTypes.ADD_ONE_OF]: ({ name }: IProduct) => ({ name }),
  [ActionTypes.REMOVE_ONE_OF]: ({ name }: IProduct) => ({ name }),
  [ActionTypes.REMOVE_ALL_OF]: ({ name }: IProduct) => ({ name }),
  [ActionTypes.REMOVE_ALL]: () => {},
});
