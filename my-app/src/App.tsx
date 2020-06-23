import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOneOf,
  removeOneOf,
  removeAllOf,
  removeAll,
  fetchData,
} from "./actions";
import { IState } from "./interfaces";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const catalogue = useSelector((state: IState) => state.catalogue);

  const cart = useSelector((state: IState) =>
    state.cart.reduce((acc: { [key: string]: number }, cur) => {
      return !acc[cur] ? { ...acc, [cur]: 1 } : { ...acc, [cur]: acc[cur] + 1 };
    }, {})
  );

  return (
    <div>
      <header></header>
      <ul>
        {catalogue.map(({ name, price }) => (
          <li>
            <h1>{name}</h1>
            <p>{price}</p>
            <button onClick={() => dispatch(addOneOf(name))}>
              Add To Cart
            </button>
          </li>
        ))}
      </ul>
      <ol>
        {Object.entries(cart).map(([name, count]) => (
          <li>
            <h1>{name}</h1>
            <p>{count}</p>
            <button onClick={() => dispatch(addOneOf(name))}>+</button>
            <button onClick={() => dispatch(removeOneOf(name))}>-</button>
            <button onClick={() => dispatch(removeAllOf(name))}>remove</button>
          </li>
        ))}
      </ol>
      <button onClick={() => dispatch(removeAll())}>Remove All</button>
    </div>
  );
}

export default App;
