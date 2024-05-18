import React from "react";
import Quiniela from "../models/Quiniela";

const TablaQuiniela = (quini: Quiniela) => {
    return (
        <div className="quini-container">
            <h2>{quini.nombre}</h2>
        </div>
    )
}

export default TablaQuiniela