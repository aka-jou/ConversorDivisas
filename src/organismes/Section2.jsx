import React from "react";
import Card from "react-bootstrap/Card";
import OriginX from "../molecules/Origin";
import DestinyX from "../molecules/Destiny";
import Calculate from "../molecules/Converter";

function Section2X() {
  return (
    <div>
    <Card className="caja">
    <OriginX/>
    <Calculate/>
    <DestinyX/>

    </Card>
    
    </div>
  );
}

export default Section2X;
