// import dependencies
import React from "react";

// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import react-testing methods
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer, defaultState } from "./reducers";
import promise from "redux-promise-middleware";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
// the component to test
import App from "./App";

const mock = [
  {
    name: "Sledgehammer",
    price: 125.75,
  },
  {
    name: "Axe",
    price: 190.5,
  },
  {
    name: "Bandsaw",
    price: 562.13,
  },
  {
    name: "Chisel",
    price: 12.9,
  },
  {
    name: "Hacksaw",
    price: 18.45,
  },
  {
    name: "Spoon",
    price: 0.2,
  },
];

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get("/product", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json(mock));
  })
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test("loads and displays the products", async () => {
  const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(promise)
  );

  const Wrapper = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => screen.getByText("Axe"));

  //Page loads correctly initially
  expect(Wrapper.getByText("The Tool Shed"));
  expect(screen.getByText("Spoon"));
  expect(screen.getByText("Sledgehammer"));
  expect(screen.getByText("Bandsaw"));
  expect(screen.getByText("Chisel"));
  expect(screen.getByText("Hacksaw"));

  //But the snack bar is not in view
  expect(screen.queryByText("View Cart")).not.toBeInTheDocument();

  const firstAddToCartButton = screen.getAllByText("Add To Cart")[0];
  fireEvent.click(firstAddToCartButton);

  //After clicking then the snackbar should be in the dom
  expect(screen.queryByText("View Cart")).toBeInTheDocument();

  const viewCartButton = screen.getByText("View Cart");
  fireEvent.click(viewCartButton);

  expect(screen.queryByText("Cart")).toBeInTheDocument();

  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);

  expect(screen.queryByText("Cart")).not.toBeInTheDocument();
});
