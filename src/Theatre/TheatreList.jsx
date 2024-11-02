import { useEffect, useState } from "react"
import { addSelectedSeat, removeSelectedSeat } from "../store/actions/seat.actions"
import { useSelector } from "react-redux"

export function TheatreList() {
    const currSeats= useSelector(state=> state.seatModule.seats)
    const [seats, setSeats] = useState(currSeats)
    const selectedSeats = useSelector(state => state.seatModule.selectedSeats)

    useEffect(() => {
        const updatedSeats = seats.map(row => {
            return row.map(seat => {
                const isSelected = selectedSeats.some(selectedSeat =>
                    selectedSeat.row === seat.row && selectedSeat.seatNumber === seat.seatNumber
                )
                return { ...seat, isSelected }
            })
        })
        setSeats(updatedSeats)
    }, [selectedSeats])
    useEffect(()=>{
        setSeats(currSeats)
    },[currSeats])

    function selectSeat(seatToSelect) {
        if (seatToSelect.isReserved) return
        if (seatToSelect.isSelected) removeSelectedSeat(seatToSelect)
        else addSelectedSeat(seatToSelect)
        const newSeats = seats.map(row => {
            return row.map(seat => {
                if (seat.row === seatToSelect.row && seat.seatNumber === seatToSelect.seatNumber) {
                    return { ...seatToSelect, isSelected: !seatToSelect.isSelected }
                }
                return seat
            })

        })
        setSeats(newSeats)
    }
    function getClass(seat) {
        if (seat.isSelected) return 'seat selected'
        if (seat.isReserved) return 'seat reserved'
        return 'seat'
    }
    return <div className="theatre-list">
        {seats.map(row => {
            return <div className="row">
                {row.map(seat => {
                    return <div className={getClass(seat)} onClick={() => selectSeat(seat)}
                    ><i className="fa-solid fa-chair"></i></div>

                })}
            </div>
        })}

    </div>
}