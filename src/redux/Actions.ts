import { createAction } from "@reduxjs/toolkit";
import Turno from "../models/Turno";

export const addQuini = createAction<string>("addQuini")
export const addCabeza = createAction<{quiniId: number, turno: Turno}>("addCabeza")
export const cleanSorteos = createAction("cleanSorteos")
export const goToPreviousDay = createAction("prevDay")