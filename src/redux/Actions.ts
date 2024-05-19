import { createAction } from "@reduxjs/toolkit";

export const addQuini = createAction<string>("addQuini")
export const addCabeza = createAction<{quiniId: number, cabeza: number}>("addCabeza")
export const cleanSorteos = createAction("cleanSorteos")
export const goToPreviousDay = createAction("prevDay")
export const goToNextDay = createAction("nextDay")