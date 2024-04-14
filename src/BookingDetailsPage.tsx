import React from "react"; 

interface Props {
    date: string
    chosenTimeOfDay: string
    coldOrWarm: string
    setPhone: ((phone: number) => void)
    setName: ((name: string) => void)
    phone: number | undefined
    name: string
    setBookingStatus: ((bookingStatus: string) => void)
}

function BookingDetailsPage (props:Props) {

    const placeOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.setPhone(parseInt((document.getElementById("phoneInputField") as HTMLButtonElement).value));
        props.setName((document.getElementById("nameInputField") as HTMLButtonElement).value);
        (document.getElementById("nameInputField") as HTMLButtonElement).value = "";
        (document.getElementById("phoneInputField") as HTMLButtonElement).value = "";
        fetch("http://localhost:3000/appointments", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({name: props.name, phone: props.phone, date: props.date, typeOfAppointment: props.coldOrWarm, timeOfDay: props.chosenTimeOfDay})
        })

        props.setBookingStatus("booked");

    }

    return (
        <div id="detailsDiv">
            <h1>Sammanfattning för din bokning:</h1>
            <h2>Datum: {props.date}</h2>
            <h2>Typ: {props.coldOrWarm}</h2>
            <h2>Pass: {props.chosenTimeOfDay}</h2>
            <form onSubmit={placeOrder}>
                <input className="margin" id="phoneInputField" type="number" placeholder="Telefon" required/>
                <input className="margin" id="nameInputField" type="text" placeholder="Namn" required/>
                <button className="margin" type="submit">Boka</button>
            </form>
        </div>
    );
}

export default BookingDetailsPage;