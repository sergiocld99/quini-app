const enum NombreTurno {
    PREVIA, PRIMERA, MATUTINA, VESPERTINA, NOCTURNA
}

export const nombres = ["Previa", "Primera", "Matutina", "Vespertina", "Nocturna"]

export function getNombre(ordinal: number){
    return nombres[ordinal]
}

export default NombreTurno