import React, { useState, useEffect } from "react";
import "../molecules/Origin.css";

function OriginX() {
  const [monedas, setMonedas] = useState([]);
  const [moneda1, setMoneda1] = useState("USD");
  const [monto, setMonto] = useState("");


  useEffect(() => {
    const accessKey = "1c5d22f6aac59d3c1f31d86fac1fc53c";
    fetch(`http://data.fixer.io/api/latest?access_key=${accessKey}`)
      .then((resp) => resp.json())
      .then((data) => {
        const rates = data.rates;
        setMonedas(Object.keys(rates));
        setExchangeRates(rates);
      });
  }, []);

  

  const validateInput = (value) => {
    const regex = /^[0-9]*(\.[0-9]+)?$/;
    return regex.test(value);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (validateInput(inputValue) || inputValue === "") {
      setMonto(inputValue);
    }
  };

  return (
    <div>
    <p className="">De:</p>
      
    </div>
  );
}
export default OriginX;
