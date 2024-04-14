
import './App.css'
interface Props {
    date : string
}
function NotOpenPage (props : Props) {

    return (
        <div id="notOpenDiv">
          <h1>Vi har ej tillgängliga tider {props.date} p.g.a helgdag, ordinarie stängda tider eller ogiltigt vald dag!</h1>
        </div>
      );
    }
    
    export default NotOpenPage;