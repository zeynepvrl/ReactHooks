import { useState, useEffect } from 'react';

function NumberList({ getItems }) {
  useEffect(() => {
    setItems(getItems(2));        //items elemanlarına 2 lerin de eklendiği bir dizi artık
    console.log('updating Items');   //SAYI DEĞİŞTİRİLDİĞİNDE BURAYA RENDER EDİLİYOR AMA TEMA DEĞİŞTİRİLDİĞİNDE DE RENDER EDİLMEMESİ İÇİN BUNLAR
  }, [getItems]);
  const [items, setItems] = useState([]);
  return items.map((item) => <div key={item}>{item}</div>);
}

export default NumberList;
