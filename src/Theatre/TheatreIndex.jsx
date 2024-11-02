import { TheatreBooking } from "./TheatreBooking";
import { TheatreList } from "./TheatreList";

export function TheatreIndex(){
    return <section className="main-page">
     
        <TheatreList/>
        <TheatreBooking/>
    </section>
}