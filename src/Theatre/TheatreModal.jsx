import { useSelector } from "react-redux"
import { clearSelectedSeats, reserveSeats } from "../store/actions/seat.actions"

export function TheatreModal({ onClose }) {
    const selectedSeats = useSelector(state => state.seatModule.selectedSeats)
    function getTotal() {
        var newTotal = 0
        for (var i = 0; i < selectedSeats.length; i++) {
            newTotal += selectedSeats[i].price
        }
        return newTotal
    }
    function reserve() {
        clearSelectedSeats()
        reserveSeats(selectedSeats)
        onClose()
        setTimeout(() => {
            alert('Booked Successfully!')
        }, 1000)
    }
    return <section className="theatre-modal">
        <h3>Let's get your tickets!</h3>
        <div className="summary">
            {selectedSeats.map(seat => {
                return <div >
                    <p>Row <span>{seat.row}</span></p>
                    <p>Seat <span>{seat.seatNumber}</span></p>
                    <p>{seat.price}₪</p>
                </div>

            })}
            <p>Total: <span>{getTotal()}</span>₪</p>
        </div>
        <div className="btns">
            <button onClick={() => onClose()}>Close</button>
            <button onClick={reserve}>Book</button>
        </div>
    </section>

}