import {useEffect} from 'react'          //Create Hooks

function useTitle(num) {                      //Artık bu hook u istediğin componente import edip tek satırda kullabilirsin
    useEffect(()=>{
        document.title=`Sayı: ${num}`;
      })
}

export default useTitle