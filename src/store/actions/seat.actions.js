import { reserve } from "../../services/theatre.service"
import { ADD_SELECTED_SEAT, CLEAR_SELECTED_SEATS, REMOVE_SELECTED_SEAT, RESERVE_SEATS } from "../reducers/seat.reducer"
import { store } from '../store'

export async function removeSelectedSeat(seat) {
    try {
        store.dispatch({ type: REMOVE_SELECTED_SEAT, seat })
    } catch (err) {
        console.log('Cannot remove seat', err)
        throw err
    }
}

export async function addSelectedSeat(seat) {
    try {
        store.dispatch({ type: ADD_SELECTED_SEAT, seat })
        return savedSeat
    } catch (err) {
        console.log('Cannot add seat', err)
        throw err
    }
}

export async function clearSelectedSeats() {
    try {
        store.dispatch({ type: CLEAR_SELECTED_SEATS })

    } catch (err) {
        console.log('Cannot clear seats', err)
        throw err
    }
}

export async function reserveSeats(seatsToReserve) {
    try {
        const newSeats= reserve(seatsToReserve)
        store.dispatch({ type: RESERVE_SEATS, seats: newSeats })
    } catch (err) {
        console.log('Cannot clear seats', err)
        throw err
    }
}

