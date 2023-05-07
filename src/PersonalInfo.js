//CUSTOM HOOK ÖRNEK2 
import React, { useState } from "react";
import useInput from "./useInput";

function PersonalInfo() {
  /* const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState(""); */

  const [firstNameV, bindFirstName, resetFirstN] = useInput(""); //initialValue olarak boş string gönderdik, firsName için
  const [lastNameV, bindLastName, resetLastmNam] = useInput(""); //aynını lastname için de oluşturduk

  const submitForm = (e) => {
    e.preventDefault(); //submit de default olarak render eder
    alert(`Merhaba ${firstNameV} ${lastNameV}`);
    //alert(`Merhaba ${firstname} ${lastname}`);
    resetFirstN();
    resetLastmNam();
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <label>Adınız:</label>
          <input
            type="text"
            {...bindFirstName}
            /* value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }} */
          />
        </div>
        <div>
          <label>Soyadınız:</label>
          <input
            type="text"
            {...bindLastName}
            /* value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }} */
          />
        </div>
        <button>Kaydet</button>{" "}
        {/* butona onClick ile de olabilir, forma onsubmit ile de */}
      </form>
    </div>
  );
}

export default PersonalInfo;
