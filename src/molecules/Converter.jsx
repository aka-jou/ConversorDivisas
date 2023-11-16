import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import infoMoneda from "../db/db";
import "../molecules/Converter.css";
function Calculate() {
  const [monedas, setMonedas] = useState([]);
  const [moneda1, setMoneda1] = useState("USD");
  const [moneda2, setMoneda2] = useState("EUR");
  const [monto, setMonto] = useState("");
  const [result, setResult] = useState("");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [conversionHistory, setConversionHistory] = useState([]);
  const [fecha, setFecha] = useState("");
  const [moneda_1, setMoneda_1] = useState("");
  const [moneda_2, setMoneda_2] = useState("");
  const [conversion, setConversion] = useState("");

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

  useEffect(() => {
    setMonto("");
    setResult("");
  }, [moneda1, moneda2]);

  const handleConvert = () => {
    if (moneda1 !== moneda2) {
      if (exchangeRates) {
        if (monto.trim() === "") {
          alert("Ponga un valor válido");
        } else {
          const conversionRate =
            exchangeRates[moneda2] / exchangeRates[moneda1];
          const convertedResult = parseFloat(monto) * conversionRate;
          setResult(convertedResult.toFixed(4)); // Agregando el paréntesis faltante aquí
          const conversionRecord = {
            moneda1,
            moneda2,
            conversion: convertedResult.toFixed(4),
            fecha: new Date().toISOString(),
          };
          setConversionHistory([...conversionHistory, conversionRecord]);
        }
      }
    }
  };

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

  const handlerClick2 = () => {
    fetch("http://localhost:8080/api/registro", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fecha, moneda_1, moneda_2, conversion }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Todo Ok");
      });
  };

  const handlerGet = () => {
    fetch("http://localhost:8080/api/registro")
      .then((response) => response.json())
      .then((data) => {
        alert(JSON.stringify(data));
      });
  };

  return (
    <>
      {infoMoneda.Data2.map((Data2, index) => (
        <div className="cajaa" key={index}>
          <div>
            <div>
              <p className="de">De:</p>
              <select
                className="select1"
                value={moneda1}
                name="moneda-1"
                id="moneda-1"
                onChange={(e) => setMoneda1(e.target.value)}
              >
                {monedas.map((moneda) => (
                  <option value={moneda} key={moneda}>
                    {moneda}
                  </option>
                ))}
              </select>
              <p className="a">a:</p>
              <select
                className="select2"
                value={moneda2}
                name="moneda-2"
                id="moneda-2"
                onChange={(e) => setMoneda2(e.target.value)}
              >
                {monedas.map((moneda) => (
                  <option value={moneda} key={moneda}>
                    {moneda}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                className="input"
                type="text"
                value={monto}
                onChange={handleInputChange}
              />
              <Card className="result">
                <p className="text">{result}</p>
              </Card>
            </div>{" "}
            <p className="taza">
              1 {moneda1} ={" "}
              {exchangeRates &&
                (exchangeRates[moneda2] / exchangeRates[moneda1]).toFixed(
                  4
                )}{" "}
              {moneda2}
            </p>
            <button onClick={handleConvert} className="bton1">
              {Data2.boton}
            </button>
            <br />
          </div>
        </div>
      ))}
    </>
  );
}

export default Calculate;
