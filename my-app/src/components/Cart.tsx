import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addOneOf, removeOneOf, removeAllOf, removeAll } from "../actions";
import { IState } from "../interfaces";

const SnackBar = styled.div`
  position: fixed;
  display: flex;
  padding: 24px;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: lightblue;
  border-top: 2px solid black;
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #33333380;
`;

const Modal = styled.div`
  height: 500px;
  width: 750px;
  margin: 48px auto;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const useModalState = (initialState?: boolean) => {
  const [isFullCartOpen, setIsFullCartOpen] = useState(initialState);
  const toggleCart = () => setIsFullCartOpen(!isFullCartOpen);

  return { isFullCartOpen, toggleCart };
};

const Cart = () => {
  const { isFullCartOpen, toggleCart } = useModalState(false);
  const dispatch = useDispatch();
  const catalogue = useSelector((state: IState) => state.catalogue);
  const cart = useSelector((state: IState) => state.cart);

  const cartAsObject = cart.reduce(
    (
      acc: {
        [key: string]: {
          count: number;
          singlePrice: number;
          totalPrice: number;
        };
      },
      cur
    ) => {
      const count = !acc[cur] ? 1 : acc[cur].count + 1;
      const singlePrice =
        catalogue.find((item) => item.name === cur)?.price || 0;
      const totalPrice = count * singlePrice;
      return { ...acc, [cur]: { count, singlePrice, totalPrice } };
    },
    {}
  );

  const sum = Object.values(cartAsObject).reduce(
    (cumulative, { totalPrice }) => {
      return (cumulative += totalPrice);
    },
    0
  );

  return (
    <>
      {Object.keys(cart).length > 0 && (
        <SnackBar>
          <div>
            <h2>{`Total: $${sum.toFixed(2)}`}</h2>
            <p>{`You have ${cart.length} items in cart`}</p>
          </div>
          <button onClick={toggleCart}>View Cart</button>
        </SnackBar>
      )}
      {isFullCartOpen && (
        <Overlay>
          <Modal>
            <h1>Cart</h1>
            <List>
              {Object.entries(cartAsObject).map(
                ([name, { count, singlePrice, totalPrice }]) => (
                  <ListItem>
                    <h2>
                      <button onClick={() => dispatch(removeOneOf(name))}>
                        -
                      </button>
                      {name}({count})
                      <button onClick={() => dispatch(addOneOf(name))}>
                        +
                      </button>
                    </h2>
                    <p>{singlePrice}</p>
                    <p>{totalPrice}</p>
                    <button onClick={() => dispatch(removeAllOf(name))}>
                      remove
                    </button>
                  </ListItem>
                )
              )}
            </List>
            <hr></hr>
            <h2>Total: ${sum.toFixed(2)}</h2>
            <button onClick={toggleCart}>Back</button>
            <button onClick={() => dispatch(removeAll())}>Remove All</button>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default Cart;
