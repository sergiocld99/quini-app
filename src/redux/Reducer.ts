import { createReducer } from "@reduxjs/toolkit"
import * as actions from "./Actions"
import DayResults from "../models/DayResults"

let lastId = 0
let currDay = 19
let currMonth = 5

const formatTwoDigits = (num: number) => {
    return (num < 10 ? '0' : '') + num
}

const initialState: DayResults = {
    fecha: formatTwoDigits(currMonth) + '-' + formatTwoDigits(currDay), 
    quinielas: []
}

export const reducer = createReducer(initialState, builder => {
    builder.addCase(actions.addQuini, (state, action) => {
        return {...state, quinielas: [...state.quinielas, {
            id: lastId++, 
            nombre: action.payload,
            turnos: []
        }]}
    }).addCase(actions.addCabeza, (state, action) => {
        return {...state, quinielas: state.quinielas.map(q => q.id !== action.payload.quiniId ? q : {
            ...q, turnos: [...q.turnos, {...action.payload.turno}]
        })}
    }).addCase(actions.cleanSorteos, state => {
        return {...state, quinielas: state.quinielas.map(q => ({...q, turnos: []})) } 
    }).addCase(actions.goToPreviousDay, state => {
        currDay--
        
        return { 
            fecha: formatTwoDigits(currMonth) + "-" + formatTwoDigits(currDay),
            quinielas: state.quinielas.map(q => ({...q, turnos: []}))
         }
    }).addCase(actions.goToNextDay, state => {
        currDay++

        return { 
            fecha: formatTwoDigits(currMonth) + "-" + formatTwoDigits(currDay),
            quinielas: state.quinielas.map(q => ({...q, turnos: []}))
         }
    })
})
