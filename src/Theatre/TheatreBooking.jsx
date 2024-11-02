import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { removeSelectedSeat } from "../store/actions/seat.actions"
import { TheatreModal } from "./TheatreModal"

export function TheatreBooking() {
    const selectedSeats = useSelector(state => state.seatModule.selectedSeats)
    const [total, setTotal] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    useEffect(() => {
        var newTotal = 0
        for (var i = 0; i < selectedSeats.length; i++) {
            newTotal += selectedSeats[i].price
        }
        setTotal(newTotal)
    }, [selectedSeats])

    return <section className="booking">
        <h1>Book your Tickets!</h1>
        <div className="seats">
            {selectedSeats.map(seat => {
                return <div >
                    <p>Row <span>{seat.row}</span></p>
                    <p>Seat <span>{seat.seatNumber}</span></p>
                    <p>{seat.price}₪</p>
                    <button onClick={() => removeSelectedSeat(seat)}><i className="fa-solid fa-trash"></i></button>
                </div>

            })}
        </div>
        {total > 0 && <div className="total">
            <p>Total price: <span>{total}</span>₪</p>
            <button onClick={()=> setIsModalOpen(true)}>Book</button>
        </div>}
        {isModalOpen&& <TheatreModal onClose={()=> setIsModalOpen(false)} /> }
    </section>
}