import { getSeats } from "../../services/theatre.service"

export const SET_SEATS = 'SET_SEATS'
export const REMOVE_SELECTED_SEAT = 'REMOVE_SELECTED_SEAT'
export const ADD_SELECTED_SEAT = 'ADD_SELECTED_SEAT'
export const CLEAR_SELECTED_SEATS = 'CLEAR_SELECTED_SEATS'
export const RESERVE_SEATS = 'RESERVE_SEATS'


const initialState = {
    seats: getSeats(),
    selectedSeats: []
}

export function seatReducer(state = initialState, action) {
    var newState = state
    var seats
    switch (action.type) {
        case RESERVE_SEATS:
            newState = { ...state, seats: action.seats }
            break

        case REMOVE_SELECTED_SEAT:
            seats = state.selectedSeats.filter(seat =>
                !(seat.row === action.seat.row && seat.seatNumber === action.seat.seatNumber)
            )
            newState = { ...state, selectedSeats: seats }
            break;
        case ADD_SELECTED_SEAT:
            newState = { ...state, selectedSeats: [...state.selectedSeats, action.seat] }
            break
        case CLEAR_SELECTED_SEATS:
            newState = { ...state, selectedSeats: [] }
        default:
    }
    return newState
}



