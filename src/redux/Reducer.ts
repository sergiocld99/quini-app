import { createReducer } from "@reduxjs/toolkit"
import Quiniela from "../models/Quiniela"
import * as actions from "./Actions"

const initialState: Quiniela[] = []
let lastId = 0

export const reducer = createReducer(initialState, builder => {
    builder.addCase(actions.addQuini, (state, action) => {
        return [...state, {
            id: ++lastId, 
            nombre: action.payload,
            turnos: []
        }]
    }).addCase(actions.addCabeza, (state, action) => {
        return state.map(q => q.id != action.payload.quiniId ? q : {
            ...q, turnos: [...q.turnos, {...action.payload.turno}]
        })
    })
})
