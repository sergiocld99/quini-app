import Quiniela from "../models/Quiniela";
import { getNombre } from "../models/NombresTurno";

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
            {quini.turnos.map((t, index) => (
              <th key={"nombre" + index}>{getNombre(t.nombre)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {quini.turnos.map((t, index) => (
              <td key={"cabeza" + index}>{formatNumber(t.cabeza)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaQuiniela;
