import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchData } from "./actions";

import Catalogue from "./components/Catalogue";
import Cart from "./components/Cart";

const Container = styled.div`
  width: 75%;
  margin: auto;
  display: relative;
`;

const Heading = styled.h1`
  margin: auto;
  text-align: center;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Container>
      <Heading>The Tool Shed</Heading>
      <Catalogue />
      <Cart />
    </Container>
  );
}

export default App;
