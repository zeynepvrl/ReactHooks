import React, { useState } from "react";       //CUSTOM HOOK ÖRNEK1
import useCounter from "./useCounter";

function Counter() {
  const[a, b, c, d]=useCounter();
  return (
    <div>
      <h2>Number:{a}</h2>
      <button onClick={b}>insrease</button>
      <button onClick={c}>decrease</button>
      <button onClick={d}>reset</button>
    </div>
  );
}

export default Counter;
