import React, { useState } from 'react'            //CUSTOM HOOK ÖRNEK1

function useCounter() {
    const [num, setNum] = useState(0);
    const increase = () => {
      setNum((current) => current + 1);
    };
    const decrease = () => {
      setNum((current) => current - 1);
    };
    const reset = () => {
      setNum(0);
    };

    return [num , increase, decrease , reset];
}

export default useCounter