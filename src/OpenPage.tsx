
import './App.css'
interface Props {
    setColdOrWarm: ((coldOrWarm:string) => void)
    setChosenTimeOfDay: ((chosenTimeOfDay:string) => void)
}

function OpenPage (props : Props) {


    return (
        <div id="chooseSpaTypeDiv">
            <div id="spaTypeHeaderDiv">Välj önskad spatyp</div>
            <button id="coldTypeButton" onClick={() => (props.setColdOrWarm("Kallspa"), props.setChosenTimeOfDay(""))}>Kallspa</button>
            <button id="warmTypeButton" onClick={() => (props.setColdOrWarm("Varmspa"), props.setChosenTimeOfDay(""))}>Varmspa</button>
        </div>
    )
}
export default OpenPage;