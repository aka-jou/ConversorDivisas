import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../molecules/Destiny.css";

function DestinyX() {
  const [monedas, setMonedas] = useState([]);
  const [moneda2, setMoneda2] = useState("EUR");
  const [result, setResult] = useState("");

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

  return (
    <div>
     <p className="">a:</p>
      
      <Card className="">
        <p className="text">{result}</p>
      </Card>
    </div>
  );
}

export default DestinyX;
