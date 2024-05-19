import { createReducer } from "@reduxjs/toolkit"
import * as actions from "./Actions"
import DayResults from "../models/DayResults"

let lastId = 0
let currTime = new Date()

const formatTwoDigits = (num: number) => {
    return (num < 10 ? '0' : '') + num
}

const getCurrDayCode = () => {
    return formatTwoDigits(currTime.getMonth() + 1) + "-" + formatTwoDigits(currTime.getDate())   
}

const initialState: DayResults = {
    fecha: getCurrDayCode(), 
    quinielas: []
}

export const reducer = createReducer(initialState, builder => {
    builder.addCase(actions.addQuini, (state, action) => {
        return {...state, quinielas: [...state.quinielas, {
            id: lastId++, 
            nombre: action.payload,
            cabezas: []
        }]}
    }).addCase(actions.addCabeza, (state, action) => {
        return {...state, quinielas: state.quinielas.map(q => q.id !== action.payload.quiniId ? q : {
            ...q, cabezas: [...q.cabezas, action.payload.cabeza]
        })}
    }).addCase(actions.cleanSorteos, state => {
        return {...state, quinielas: state.quinielas.map(q => ({...q, cabezas: []})) } 
    }).addCase(actions.goToPreviousDay, state => {
        currTime.setDate(currTime.getDate() - 1)
        
        return { 
            fecha: getCurrDayCode(),
            quinielas: state.quinielas.map(q => ({...q, cabezas: []}))
         }
    }).addCase(actions.goToNextDay, state => {
        currTime.setDate(currTime.getDate() + 1)

        return { 
            fecha: getCurrDayCode(),
            quinielas: state.quinielas.map(q => ({...q, cabezas: []}))
         }
    })
})
