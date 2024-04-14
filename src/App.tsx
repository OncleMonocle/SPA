import { useEffect, useState,  } from 'react'

import './App.css'
import Calendar from 'react-calendar';
import NotOpenPage from './NotOpenPage.tsx';
import OpenPage from './OpenPage.tsx';
import ColdSpaAppointments from './ColdSpaAppointments.tsx';
import WarmSpaAppointments from './WarmSpaAppointments.tsx';
import BookingDetailsPage from './BookingDetailsPage.tsx';
import Confirmation from './Confirmation.tsx';

function App() {

  interface fetchedDateInfoObj {
    day: string,
    helgdag: string | undefined
  }


  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];
  const [value, setValue] = useState<Value|null>(null);
  const [date, setDate] = useState<string>("")
  const [openPage, setOpenPage] = useState <string>("")
  const [fetchedDateInfo, setFetchedDateInfo] = useState<fetchedDateInfoObj>();
  const [coldOrWarm, setColdOrWarm] = useState<string>("");
  const [chosenTimeOfDay, setChosenTimeOfDay] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<number | undefined>();
  const [bookingStatus, setBookingStatus] = useState<string> ("");

  const formatFromValueToDate = (value: Value) =>{
      const stringValue = value?.toString();
      const stringMonth = stringValue?.substring(4,7);
      let formattedMonth: string | null = null;

      switch (stringMonth) {
          case "Jan": formattedMonth = "01"; break;
          case "Feb": formattedMonth = "02"; break;
          case "Mar": formattedMonth = "03"; break;
          case "Apr": formattedMonth = "04"; break;
          case "May": formattedMonth = "05";  break;
          case "Jun": formattedMonth = "06"; break;
          case "Jul": formattedMonth = "07"; break;
          case "Aug": formattedMonth = "08"; break;
          case "Sep": formattedMonth = "09"; break;
          case "Oct": formattedMonth = "10"; break;
          case "Nov": formattedMonth = "11"; break;
          case "Dec": formattedMonth = "12"; break;
          default: null;
      } 
  
      const day = stringValue?.substring(8,10); 
      const year = stringValue?.substring(11,15);
      let completeDate = year + "/" + formattedMonth +"/"+day;
      return completeDate;
  }
    
  useEffect(() => {
      if (value != null) {
          const formattedDate = formatFromValueToDate(value);
          setDate(formattedDate);
          fetch("https://sholiday.faboul.se/dagar/v2.1/"+formattedDate)
          .then(res => res.json())
          .then(data => {
            const obj: fetchedDateInfoObj = {day: data.dagar[0]["veckodag"], helgdag: data.dagar[0]["helgdag"]}
            setFetchedDateInfo(obj);
            setChosenTimeOfDay("");
            }
          )
      }
  }, [value])


  useEffect(() => {
    if(date !== "") {
      if(value!=null) {
        setColdOrWarm("");
        if ((fetchedDateInfo?.day !== "Måndag") && (fetchedDateInfo?.helgdag === undefined) && (value > new Date())) {
          setOpenPage("validDay");
        } else{
          setOpenPage("invalidDay");
        } 
      }
    }
  }, [fetchedDateInfo])

  
  return (
    <div>
      {
        {
          "":
            <div id="mainDiv">
              <h1 className='colorFont'>Välkommen till vårt spa! Välj önskad dag, vi har stängt på måndagar och helgdagar.</h1>
              <h3 className='colorFont'>Bokning måste ske minst 1 dag fram.</h3>
              <div id="startPage">
                <Calendar onChange={setValue} />
              </div>
              <div >
                {
                  {
                    "validDay": <OpenPage setColdOrWarm={setColdOrWarm} setChosenTimeOfDay={setChosenTimeOfDay} />,
                    "invalidDay": <NotOpenPage date={date} />,
                    "": <div></div>
                  }[openPage]
                }
              </div>
              {
                {
                  "Kallspa": <ColdSpaAppointments date={date} coldOrWarm={coldOrWarm} setChosenTimeOfDay={setChosenTimeOfDay} chosenTimeOfDay={chosenTimeOfDay} />,
                  "Varmspa": <WarmSpaAppointments date={date} coldOrWarm={coldOrWarm} setChosenTimeOfDay={setChosenTimeOfDay} chosenTimeOfDay={chosenTimeOfDay} />,
                  "": <div></div>
                }[coldOrWarm]
              }
              {
                {
                  "Förmiddag": <BookingDetailsPage date={date} coldOrWarm={coldOrWarm} chosenTimeOfDay={chosenTimeOfDay} setName={setName} setPhone={setPhone} name={name} phone={phone} setBookingStatus={setBookingStatus} />,
                  "Eftermiddag": <BookingDetailsPage date={date} coldOrWarm={coldOrWarm} chosenTimeOfDay={chosenTimeOfDay} setName={setName} setPhone={setPhone} name={name} phone={phone} setBookingStatus={setBookingStatus} />,
                  "Kväll": <BookingDetailsPage date={date} coldOrWarm={coldOrWarm} chosenTimeOfDay={chosenTimeOfDay} setName={setName} setPhone={setPhone} name={name} phone={phone} setBookingStatus={setBookingStatus} />,
                  "": <div></div>
                }[chosenTimeOfDay]
              }
            </div>,
          "booked": <Confirmation date={date} coldOrWarm={coldOrWarm} chosenTimeOfDay={chosenTimeOfDay} 
          setName={setName} setPhone={setPhone} name={name} phone={phone} setBookingStatus={setBookingStatus} 
          setOpenPage={setOpenPage} setColdOrWarm={setColdOrWarm} setChosenTimeOfDay={setChosenTimeOfDay}/>
        }[bookingStatus]
      }
    </div>
  );
}

export default App;
