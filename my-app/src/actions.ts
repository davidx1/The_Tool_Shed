import { createActions } from "redux-actions";
import { IProduct, ActionTypes } from "./interfaces";

export const {
  addOneOf,
  removeOneOf,
  removeAllOf,
  removeAll,
  fetchData,
} = createActions({
  [ActionTypes.ADD_ONE_OF]: (name: string) => ({ name }),
  [ActionTypes.REMOVE_ONE_OF]: (name: string) => ({ name }),
  [ActionTypes.REMOVE_ALL_OF]: (name: string) => ({ name }),
  [ActionTypes.REMOVE_ALL]: () => {},
  [ActionTypes.FETCH_DATA]: async () => {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    return { data };
  },
});
