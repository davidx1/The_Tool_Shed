import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addOneOf } from "../actions";
import { IState } from "../interfaces";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 40%;
  padding: 16px;
  border: 2px solid black;
  margin-bottom: 8px;
  margin-right: 8px;
  list-style: none;
  border-radius: 8px;
  box-shadow: 5px 10px 10px lightgrey;
`;

const Catalogue = () => {
  const dispatch = useDispatch();
  const catalogue = useSelector((state: IState) => state.catalogue);

  return (
    <List>
      {catalogue.map(({ name, price }) => (
        <ListItem key={name}>
          <h1>{name}</h1>
          <p>${price.toFixed(2)}</p>
          <button onClick={() => dispatch(addOneOf(name))}>Add To Cart</button>
        </ListItem>
      ))}
    </List>
  );
};

export default Catalogue;
