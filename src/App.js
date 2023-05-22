// Custom Hook örnek1(Counter) VE ÖRNEK2(PersonalInfo)
import Counter from "./Counter";
import PersonalInfo from "./PersonalInfo";

function App() {
  return (
    <div>
      <Counter /> 
      <PersonalInfo/>
    </div>
  );
} 

export default App;



//Create Hooks  , Custom Hook
import {useEffect, useState} from 'react';
import useTitle from './useTitle';

function App() {
  const [sayı, setSayı] = useState(0)
  
  useTitle(sayı)
  return ( 
    <div>
      <button onClick={()=>setSayı(sayı+1)} >Sayı: {sayı}</button>
    </div>
   );
}

export default App;


//useDefferedValue
import { useState } from "react";
import Characters from "./Characters";

function App() {
  const [input, setInput] = useState('');
  const handleChange=(e)=>{
    setInput(e.target.value);
  }
  return ( 
    <>
    <input type="text" value={input} onChange={handleChange}/>
    <Characters input={input}/>
    </>
   );
}

export default App;


//useTransition
import { useState, useTransition } from "react";

function App() {
  const [input, setInput] = useState("");
  const [myList, setMyList] = useState([]);
  const [isPending, startTransition] = useTransition(); //is Pending startTransition bittiğinde false olur

  const handleChange = (e) => {
    //e burda onChange event bilgilerini tutar
    setInput(e.target.value); //ÖNCELİK BU OLDUĞU İÇİN

    startTransition(() => {
      //ÖNDELİK ÖLMAYANI STARTTRANSİTİON İÇİNE ALDIK , ÇİFT RENDER OLUYOR AMA !
      const MyArray = []; //değişikleri string olarak input state inde güncelleyecek ama her bir değişikliği array olarak MyList arrayinde güncelleyecek

      for (let i = 0; i < 2000; i++) {
        MyArray.push(e.target.value); //input da a yazınca MyArraye 2000 tane a elemanı olacak
      }
      setMyList(MyArray);
    });
  };
  return (
    <>
      <input type="text" value={input} onChange={handleChange} />
      {isPending
        ? "Yükleniyor.."
        : myList.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
    </>
  );
}

export default App;

//UseReducer
import "./App.css";
import React, { useEffect, useReducer } from "react";
import Calculate from "./Calculate";

export const NewContext = React.createContext(); //context yapısını istediğin yerde oluşturabilirsin

const initialValue = 0;
const ReducerFunction = (state, action) => {
  //ReducerFunction fonksiyonunun component'in içinde tanımlanması durumunda, sadece App component'i içinde kullanılabilir hale gelir. Ancak, fonksiyonun component'in dışında tanımlanması durumunda, ReducerFunction fonksiyonu farklı component'ler tarafından da kullanılabilir hale gelir.
  //action buttonlarda belirlenmiş olan anahtar kelimelere göre switch case ler içerisinde işlemleri yapacak ve geriye bir state döndirecek
  switch (action) {
    case "increment":
      return state + 1; //ilk başta state initialValue daan ötürü 0 ı taşıyor burda 0+1 den 1 i return ediyor bu da newStateCount oluyor
    case "decrement":
      return state - 1;
    case "reset":
      return initialValue; //fonksiyon 0 değerini döndürdüğünde newStateCount 0 a eşit placak ve 0 değerini bastıracak
    default:
      return state;
  }
};

function App() {
  const [newStateCount, dispatch] = useReducer(ReducerFunction, initialValue); //count yukardaki fonksiyondan dönen değer, dispatch ise bunu sağlayan fonksiyonun ismi
  useEffect(() => {
    console.log("burada aslında beckende istek kodu olacak");
  }, [newStateCount]); //bu değiştiğinde isteği gönder
  return (
    <div className="App">
      <NewContext.Provider
        value={{                     //value taşınacak değerleri belirtiyor
          Count: newStateCount, 
          dispatch: dispatch,
        }}   //value={{newStateCount, dispatch}}
      >
        <Calculate />
      </NewContext.Provider>
    </div> //yukardaki ilk isim Count ve dispatch Calculate.js de use edilen NewContext e eşitlenecek olan context yapısının methodları olacaktır
  );
}
export default App;
/*reducer fonksiyonu, state değişikliklerinin nasıl yapılacağını belirten bir fonksiyondur ve tipik olarak bir switch ifadesi içerisinde
işlevselliği tanımlanır. reducer fonksiyonları, component'in içerisinde yer almak zorunda değillerdir ve genellikle state yönetimi 
işlevselliğini sağlayan fonksiyonlardan ayrı olarak tutulurlar. Bu, reducer fonksiyonunun, state yönetimi işlevselliği ile birlikte
kullanılabilmesini ve aynı reducer fonksiyonunun farklı component'lerde kullanılabilmesini sağlar.  
  useReducer hook'u, React bileşenlerinde durum yönetimi için kullanılan bir başka yöntemdir. useState ile benzer şekilde çalışır,
 ancak daha karmaşık durum yönetimi gerektiğinde kullanılır. useReducer, bir durum ve bir işlev alır ve bileşenin durumunu güncellemek 
 için bu işlevi kullanır. */

//UseRef
import { useState, useEffect, useRef } from 'react';

function App() {
  const [name, setName] = useState('');
  // const [renderCount, setRenderCount] = useState(0);  //burdaki state değiştiğinde her seferinde tekrar otamatik render olur ve bu useEffect içerisinde sonsuz döngüye sebep olur
  const renderCount = useRef(0);  //bu parametre current ı 0 a eşitliyor
  // {current:0}
  const inputRef = useRef();

  useEffect(() => {
    // setRenderCount((prev) => prev + 1);  //prev parametresi RenderCount un bir önceki değerini temsil eder, yani ilk değeri 0 dir // Bu şekilde bırakıldığında sonsuz döngüye giriyor ve sürekli render ediyor, RenderCount değiştikçe tekrar usefeccet tetikleniyor, bu yüzden renderCount u useState ile değil useRef ile oluşturuyoruz!!
    renderCount.current = renderCount.current + 1;
  });

  const focusInput = () => {
    console.log(inputRef.current);
    inputRef.current.focus();  // focus() yöntemi, bir HTML elemanına odaklanır. Örneğin, <input> elemanına odaklanmak, kullanıcının o elemana klavye girdisi yapabileceği anlamına gelir.
    inputRef.current.value = 'Can';
  };
  return (
    <div className="App">
      <input
        ref={inputRef}    //inputRef.current ile bu hetml etiketine ulaşılabilir
        type="text"
        value={name}   //useState kullanırken BURDAKİ STATE HER DEĞİŞTİĞİNDE COMPONENT RENDER OLUR, COMPONENTİ RENDER OLMADAN DEĞİŞTİREBİLME İMKANI => useRef
        onChange={(e) => setName(e.target.value)}
      />
      <div>Benim adım {name}</div>
      <div>{renderCount.current} defa render oldu</div>
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

export default App;
/* useRef in iki kullanım amacı olabilir. bunlardan ilki sonsuz useEffect render döngüsünden kaçınmak için
useRef, React fonksiyon bileşenleri içinde bir referans oluşturmak için kullanılan bir kancadır. Bu referans, 
genellikle DOM elemanlarına veya bileşenlerde saklanacak verilere erişmek için kullanılır.

useRef bir işlev bileşeninde deklare edilebilir ve geriye bir nesne döndürür. Bu nesne, .current özelliği aracılığıyla 
herhangi bir değeri veya nesneyi saklayabilir. .current özelliği herhangi bir bileşen render edildiğinde değişmez.

const renderCount = useRef(0);    ne yapar

Bu kod, bir renderCount adlı değişkeni useRef kullanarak oluşturur. useRef işlevi, bir nesne döndürür ve bu nesne,
 aynı component içinde birçok render işlemi sırasında korunur. Bu nedenle, renderCount.current özelliği, component'in 
 farklı render işlemleri arasında değer saklamak için kullanılabilir.

Örneğin, renderCount.current özelliği, component'in kaç kez yeniden render edildiğini takip etmek için kullanılabilir.
Bu, component'in performansını izlemeye yardımcı olabilir. renderCount.current özelliği, useRef(0) ile başlatıldığı için,
her render işlemi sırasında renderCount.current özelliği bir artırılacaktır. Böylece, renderCount.current özelliği
component'in kaç kez render edildiğini sayar.

Örneğin, bir form elemanına odaklanmak istiyorsanız, useRef kullanarak <input> elemanına bir referans oluşturabilirsiniz.
Daha sonra, component'in render edilmesine gerek olmadan, inputRef.current.focus() yöntemi kullanılarak <input> elemanına
odaklanılabilir.

Yine de UseState yöntemi daha avantajlıdır güncellenebilme ve props taşıma konularında sağladıklarından ötürü */

//USECALLBACK
import { useState, useCallback } from 'react';
import NumberList from './NumberList';

function App() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  const getItems = useCallback(     //Burada useCallBack olmasaydı tema değiştiğinde de burası tetiklenirdi ve number değişmediği halde bekleme olurdu
    (incrementValue) => {   // increment value  NumberList de gönderilen parametredeki 2 değeri
      return [                   //useMemo dan  farkı burda fonksiyon geri döndürmes, useMemoda değer geri döndürüyordu
        number + incrementValue,
        number + 1 + incrementValue,
        number + 2 + incrementValue,
      ];
    },
    [number]   //GETITEMS FONKSİYONUNU SADECE NUMBER DEĞİŞTİĞİNDE TETİKLE DEMEK, NUMBER DEĞİŞMEDİYSE RENDER DURUMUNDA CASH İ KULLAN
  );
  const theme = {   //TEMA DEĞİŞTİĞİNDE OTAMATİK APP COMPENENTİ RENDER EDİLİYOR VE YALNIZCA TEMA DEĞİŞTİĞİ HALDE APP RENDER EDİLDİĞİ İÇİN GETIREMS DA ÇAĞIRILIYOR VE USEEFFECT DE ÇAĞIRILIYOR DOLAYISI İLE, BUNDAN USECALLBACK KULLANIYORUZ
    backgroundColor: dark ? '#333' : '#FFF',
    color: dark ? '#FFF' : '#333',
  };

  return (
    <div style={theme}>  
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>  
        Temayı Değiştir   
      </button>  
      <NumberList getItems={getItems} />  
    </div>
  );
}

export default App; 

//USEMEMO
import {useState, useMemo } from 'react';

function App() { 
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false); //THEMA DEĞİŞTİĞİNDE OTAMATİK RENDER OLUR, BU RENDER DA NUMBER DEĞİŞMEDİYSE DOUBLENUMBER DEĞERİ CACH DEN KULLANILSIN
  const doubleNumber = useMemo(() => {
    return slowFunc(number);
  }, [number]);

  const theme = {
    backgroundColor: dark ? '#333' : '#FFF',
    color: dark ? '#FFF' : '#333',
  };

  return (
    <div className="App">
      <>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <button onClick={() => setDark((prevDark) => !prevDark)}>
          Temayı Değiştir
        </button>
        <div style={theme}>{doubleNumber}</div>   
      </>   //yalnızca doubleNumber değiştiğinde bekleme olmalı burda thema değiştiğinde değil, temayı değiştirdiğinde doubLeNumber sabit olduğu için tekrar fonksiyonları çağırmayacak ve bekleme olmayacak
    </div>
  );
}

function slowFunc(num) {
  console.log('Fonksiyon çağrıldı');
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
}

export default App;
/*useMemo kullanım amacı, hesaplama maliyeti yüksek olan işlemleri optimize etmek ve gereksiz yere tekrar hesaplama
 yapmaktan kaçınmaktır. Bu fonksiyon, işlemin bağımlılık dizisi değişmediği sürece önbellekte hesaplama sonucunu saklar 
 ve sonraki render işlemlerinde bu sonucu kullanır. Bu sayede, aynı hesaplama işlemi herhangi bir state değişikliği 
 olduğunda tekrar yapılmaz ve performans artışı sağlanır.

Örneğin, bir sayfada büyük bir veri kümesi bulunuyorsa ve bu veriler herhangi bir şekilde filtrelenerek gösteriliyorsa, 
filtreleme işlemi her yapıldığında tüm veri kümesi tekrar işlenmemelidir. Bunun yerine, useMemo kullanılarak filtreleme 
işlemi sadece filtreleme kriterleri değiştiğinde yapılmalı ve sonuçlar önbellekte saklanarak sonraki işlemlerde tekrar
 kullanılmalıdır.

Özetle, useMemo hook'u kullanılarak, hesaplama maliyeti yüksek olan işlemler optimize edilir ve gereksiz yere tekrar
 hesaplama yapılmaktan kaçınılır. Bu da uygulamanın performansını artırır.

 useMemo, iki parametre alır: biri hesaplanacak işlem, diğeri ise bağımlılık dizisidir. Bağımlılık dizisi, hesaplamayı 
 tetikleyen değişkenlerin yer aldığı bir diziye karşılık gelir. Bu değişkenlerden herhangi biri değiştiğinde, hesaplama
  yeniden yapılır. Eğer bağımlılık dizisi belirtilmezse, herhangi bir değişiklik olduğunda hesaplama yeniden yapılır. */

//USEFFECT
import './App.css';
import {useState , useEffect} from 'react';

function App() {
  const [can, setCan] = useState(0)
  const [zeyn, setZeyn] = useState(0)

  useEffect(()=>{               // herhangi bir değişiklik olduğunda render et ve bu içeriği çalıştır her değişiklilkte
    console.log('her zaman çalışır');        //her zaman o listeyi çekmeye ihtiyaç olacağında, her render olduğunda her    
  });                                 //site içerisinde herhangi bir her değişiklikte renderı tetiklemek için kullanılır, olduğunda use Effect in içerisinde bir çekme işlemi yapılabilir

  useEffect(()=>{               // ilk yüklendiğinde bir API'den veri alır bunu state olarek set eder ve daha sonra yeniden yüklenmez:
    console.log('ilk kez render edildiğinde çalışır bir daha çalışmaz')        
  },[]);           // bu işlemin örnek kullanımı: component ilk render edildiğinde bir liste çekeceksek


  useEffect(()=>{
    console.log('ilk kez render edildiğinde ve can değerinde bir değişiklik olduğunda çalışır')
  },[can]);


  return (
    <div className="App">
      <div className='firstDiv'>
      <button onClick={()=> setCan(can+1)} >Can++</button>   
      <div>Can:{can}</div>
      </div>
      <div>
        <button onClick={()=>setZeyn(zeyn+1)} >Zeyn++</button>
        <div>Zeyn:{zeyn}</div>
      </div>
    </div>
  );
}

export default App;
