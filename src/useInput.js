import { useState } from "react"

function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const bindObject= {
        value,
        onChange:(e)=>{
            setValue(e.target.value);
        }
    }
    const reset=()=>{
        setValue('');
    }
    return [value,bindObject,reset];
}

export default useInput