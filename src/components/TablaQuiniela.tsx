import Quiniela from "../models/Quiniela";
import { nombres } from "../models/NombresTurno";
import { formatNumber } from "../utils/Utils";
import { useState } from "react";

type Props = {
  quini: Quiniela;
  bestF: number[];
};

const TablaQuiniela = ({ quini, bestF }: Props) => {
  const turnosDestacados: boolean[] = Array(6).fill(false)
  quini.cabezas.forEach((cab, i) => {
    let num = cab % 100
    turnosDestacados[i] = bestF.includes(num) || bestF.includes(num >= 50 ? num - 50 : num + 50)
  })

  return (
    <div className="quini-container">
      <h2>{quini.nombre}</h2>
      <table>
        <thead>
          <tr>
            {nombres.map((n, index) => (
              <th key={"nombre" + index} className={turnosDestacados[index] ? "th-best" : "th-normal"}>{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {quini.cabezas.length
              ? quini.cabezas.map((cab, index) => (
                  <td key={"cabeza" + index} className={turnosDestacados[index] ? "best-family" : "normal-family"}>{formatNumber(cab)}</td>
                ))
              : nombres.map((n, index) => <td key={"cabeza" + index}>----</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaQuiniela;
