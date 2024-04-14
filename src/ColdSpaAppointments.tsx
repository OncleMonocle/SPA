import { useEffect } from "react";

interface Props {
    date: string,
    coldOrWarm: string
    setChosenTimeOfDay: ((chosenTimeOfDay: string) => void)
    chosenTimeOfDay: string
}

function ColdSpaAppointments (props : Props) {

    useEffect(() => {
        if(props.coldOrWarm !== "") {
            fetch("http://localhost:3000/appointments")
                .then(res => res.json())
                .then(data => {
                    for (let i=0; i<data.length; i++) {
                        if(data[i]["date"] === props.date) {
                            if(data[i]["typeOfAppointment"] === props.coldOrWarm) {
                                if(data[i]["timeOfDay"] === (document.getElementById("button1") as HTMLButtonElement)?.value) {
                                    (document.getElementById("button1") as HTMLButtonElement).disabled = true;
                                }
                                if(data[i]["timeOfDay"] === (document.getElementById("button2") as HTMLButtonElement)?.value) {
                                    (document.getElementById("button2") as HTMLButtonElement).disabled = true;
                                }
                                if(data[i]["timeOfDay"] === (document.getElementById("button3") as HTMLButtonElement)?.value) {
                                    (document.getElementById("button3") as HTMLButtonElement).disabled = true;
                                }
                            }
                        }
                    }
                }
            )
        }
    }, [props.coldOrWarm])

    return (
        <div>
            <h1 id="spaTypeHeaderDiv">Välj önskat pass för vald dag ({props.date}), de oväljbara tiderna är redan upptagna</h1>
            <button className="margin" id="button1" value="Förmiddag" onClick={(e)=> props.setChosenTimeOfDay(e.currentTarget.value)}>Förmiddag</button>
            <button className="margin" id="button2" value="Eftermiddag" onClick={(e) => props.setChosenTimeOfDay(e.currentTarget.value)}>Eftermiddag</button>
            <button className="margin" id="button3" value="Kväll" onClick={(e) => props.setChosenTimeOfDay(e.currentTarget.value)}>Kväll</button>
        </div>
    );
}

export default ColdSpaAppointments;