import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <header></header>
      <ul>
        <li>
          <h1>Title</h1>
          <p>Description</p>
        </li>
      </ul>
      <ol>
        <li>
          <h1>Title</h1>
          <p>Count</p>
          <button>+</button>
          <button>-</button>
          <button>remove</button>
        </li>
      </ol>
    </div>
  );
}

export default App;
