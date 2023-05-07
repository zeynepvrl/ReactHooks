/* import { useDeferredValue, useMemo } from "react";     //useDefferedValue

function Characters({input}) {     
    const deffred =useDeferredValue(input);   //bundan sonraki input yazan yerlere deffered yazmalısın
    const MyList= useMemo(()=>{          //ÖNCELİĞİM DİĞER COMPONENTTEKİ SETINPUT OLDUĞU İÇİN USEDEFERRED İ BURDA KULLANIYORUM
        const MyArray=[];
        for(let i=0; i<2000;i++){
            MyArray.push(<div key={i} >{deffred}</div>);
        }
        return MyArray;
    },[deffred]);
    return (MyList);
}

export default Characters; */

/*useTransition ve useDeferredValue React hook'ları, React uygulamalarında animasyonlu geçişler oluşturmak için 
kullanılan iki farklı yöntemdir. Her ikisi de React 18 ile birlikte tanıtılmıştır.

useTransition, animasyonlu bir geçiş yapılacak bir bileşenin state'ini değiştirmeden önce geçiş esnasında kullanıcının
ekranda bir şeyler görmesini sağlamak için kullanılır. Yani, useTransition kullanıldığında, bileşen state'indeki
değişikliklerin ekranda animasyonlu bir şekilde görüntülenmesi sağlanır.

Öte yandan, useDeferredValue animasyonlu geçişlerde, animasyonların performansını artırmak için kullanılır.
Bu hook, bir bileşen state'ini hemen güncellemez, bunun yerine, state güncellemesi bir sonraki "render" sırasına
ertelenir. Bu, animasyonlu geçişlerde daha akıcı bir hareket sağlayabilir, çünkü önceki ve sonraki bileşen durumları 
arasındaki fark daha az görünür hale gelir.

Kısacası, useTransition animasyonlu geçişlerde geçiş öncesinde animasyon sağlamak için kullanılırken, useDeferredValue
daha akıcı bir animasyon sağlamak için kullanılır.   */




