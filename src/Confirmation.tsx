
interface Props {
    name: string
    phone: number | undefined
    date: string
    coldOrWarm: string
    chosenTimeOfDay: string
    setName: ((name: string) => void)
    setPhone:((phone: number|undefined) => void)
    setBookingStatus:((bookingStatus: string) => void)
    setOpenPage : ((openPage: string) => void)
    setColdOrWarm: ((coldOrWarm: string) => void)
    setChosenTimeOfDay: ((chosenTimeOfDay: string) => void)
}



function Confirmation (props : Props) {
    return (
        <div id="detailsDiv">
            <h1>Tack för din bokning! Bokningsbekräftelse:</h1>
            <h2>Datum: {props.date}</h2>
            <h2>Typ: {props.coldOrWarm}</h2>
            <h2>Pass: {props.chosenTimeOfDay}</h2>
            <h2>Namn: {props.name}</h2>
            <h2>Telefon: {props.phone}</h2>
            <button onClick={() => (props.setBookingStatus(""), props.setOpenPage(""), props.setColdOrWarm(""), props.setChosenTimeOfDay(""))}>Gå till startsida</button>
        </div>
    );
}

export default Confirmation;