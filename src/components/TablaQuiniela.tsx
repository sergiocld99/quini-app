import Quiniela from "../models/Quiniela";
import { getNombre } from "../models/NombresTurno";

const formatNumber = (num: number, minDecimals = 4) => {
    let digits = num.toString()
    const zerosToAdd = minDecimals- digits.length
    
    for (let i=0; i<zerosToAdd; i++){
        digits = '0' + digits
    }

    return digits
}

const TablaQuiniela = (quini: Quiniela) => {
    return (
        <div className="quini-container">
            <h2>{quini.nombre}</h2>
            <table>
                {
                    quini.turnos.map(t => (
                        <th>{getNombre(t.nombre)}</th>
                    ))
                }
                <tr>
                    {
                        quini.turnos.map(t => (
                            <td>{formatNumber(t.cabeza)}</td>
                        ))
                    }
                </tr>
            </table>
        </div>
    )
}

export default TablaQuiniela