import Quiniela from "../models/Quiniela";
import { nombres } from "../models/NombresTurno";

const formatNumber = (num: number, minDecimals = 4) => {
  let digits = num.toString();
  const zerosToAdd = minDecimals - digits.length;

  for (let i = 0; i < zerosToAdd; i++) {
    digits = "0" + digits;
  }

  return digits;
};

const TablaQuiniela = (quini: Quiniela) => {
  return (
    <div className="quini-container">
      <h2>{quini.nombre}</h2>
      <table>
        <thead>
          <tr>
            {nombres.map((n, index) => (
              <th key={"nombre" + index}>{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {quini.cabezas.length ? quini.cabezas.map((cab, index) => (
              <td key={"cabeza" + index}>{formatNumber(cab)}</td>
            )) : nombres.map((n, index) => (<td key={"cabeza" + index}>----</td>)) }
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaQuiniela;
