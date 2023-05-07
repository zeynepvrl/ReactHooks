import { NewContext } from "./App";      //UseReducer 
import { useContext } from "react";

function Calculate() {
  const newContextt=useContext(NewContext);
  //const {newStateCount,dispatch}=useContext(NewContext);
  return (
    <>
      <div>Sayı:{newContextt.Count}</div>
      <button onClick={() => newContextt.dispatch("increment")}>Arttır</button>
      <button onClick={() => newContextt.dispatch("decrement")}>Azalt</button>
      <button onClick={() => newContextt.dispatch("reset")}>Reset</button>
    </>
  );
}

export default Calculate;
