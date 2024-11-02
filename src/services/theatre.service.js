var gSeats = []
export function getSeats() {
    if (!gSeats || gSeats.length === 0) gSeats = generateSeatingLayout(7,10)
    return gSeats
}

function generateSeatingLayout(rows, seatsPerRow) {
    const seats = [];

    // Create the seating layout as a matrix
    for (let row = 1; row <= rows; row++) {
        const rowSeats = [];
        for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
            rowSeats.push({ row, seatNumber, isReserved: false, isSelected: false, price:90 });
        }
        seats.push(rowSeats);
    }

    // Determine a random number of seats to reserve between 10 and 25
    const numSeatsToReserve = Math.floor(Math.random() * 16) + 10; // 10-25 inclusive
    const totalSeats = rows * seatsPerRow;
    const reservedIndices = new Set();

    // Randomly reserve seats
    while (reservedIndices.size < numSeatsToReserve) {
        const randomIndex = Math.floor(Math.random() * totalSeats);
        const rowIndex = Math.floor(randomIndex / seatsPerRow);
        const seatIndex = randomIndex % seatsPerRow;

        if (!seats[rowIndex][seatIndex].isReserved) {
            seats[rowIndex][seatIndex].isReserved = true;
            reservedIndices.add(randomIndex);
        }
    }

    return seats;
}

export function reserve(seats){
    const updatedSeats = gSeats.map(row => {
        return row.map(seat => {
            if(seat.isReserved) return seat
            const isReserved = seats.some(selectedSeat =>
                selectedSeat.row === seat.row && selectedSeat.seatNumber === seat.seatNumber
            )
            return { ...seat, isReserved }
        })
    })
    gSeats= updatedSeats
    return updatedSeats
}