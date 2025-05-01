//imported react and useState from react library , we will use useState to manage the state or storing the input data in the memory of the component
import React,{useState} from 'react';
import {collection,addDoc, Timestamp} from 'firebase/firestore';//importing firestore functions to add data to the database
import { db } from '../firebase'; //importing firebase configuration file to use firestore database
//create a functional component named CreateEvent which will return a html(jsx) structure of the form to create an event
//and also a list of events created by the user
function CreateEvent() {
    //eventName is a state variable which will store the name of the event
    //setEventName is a function which will set the value of eventName
    //useState is a hook which will return an array of two elements, first is the state variable and second is the function to set the value of the state variable
    //initial value of eventName is an empty string
    //similarly for other state variables
    const [eventName,setEventName]=useState('');
    const [eventDate,setEventDate]=useState('');
    const [eventTime,setEventTime]=useState('');
    const [eventLocation,setEventLocation]=useState('');
    const [eventDescription,setEventDescription]=useState('');
    const [eventOrganizer,setEventOrganizer]=useState('');
    const [eventContact,setEventContact]=useState('');
    const [eventImage,setEventImage]=useState(null);
    const [eventRegistrationLink,setEventRegistrationLink]=useState('');
    //events is a state variable which will store the list of events created by the user
    //setEvents is a function which will set the value of events
    //After a new event is created a new event object is created and pushed to the events array
    //initial value of events is an empty array
    const [events,setEvents]=useState([]);
    //handlesubmit is a function which will be called when the form is submitted
    const handlesubmit= async (e)=>{
        //e is the event object which is passed to the function when the form is submitted
        //e.preventDefault() will prevent the default behavior of the form
        //which is to refresh the page and lose the data entered in the form
        //instead we will create a new event object and push it to the events array
        e.preventDefault();
        //create a new event object with the values entered in the form
        const newEvent={
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
            organizer: eventOrganizer,
            contact: eventContact,
            image: eventImage,
            registrationLink: eventRegistrationLink,
            timestamp: new Date()
        };
        try {
            //addDoc is a function which will add the new event object to the events collection in the firestore database
            //collection is a function which will return a reference to the events collection in the firestore database
            await addDoc(collection(db, "events"), newEvent);
            // push the new event object to the events array
            // setEvents is a function which will set the value of events
            // events is a state variable which will store the list of events created by the user
            setEvents([...events, newEvent]);
            // reset the form fields to empty strings after the event is created
            setEventName('');
            setEventDate('');
            setEventTime('');
            setEventLocation('');
            setEventDescription('');
            setEventOrganizer('');
            setEventContact('');
            setEventImage(null);
            setEventRegistrationLink('');
            alert('Event Created Successfully!');
        } catch (error) {
            console.error("Error adding event: ", error);
            alert('Something went wrong! Please try again.');
        }
    };
    //handleImageupload is a function which will be called when the user selects an image file
    //e is the event object which is passed to the function when the user selects an image file
    const handleImageupload=(e)=>{
        //e.target.files[0] will give the first file selected by the user
        const file=e.target.files[0];
        if(file){
            //URL.createObjectURL(file) will create a URL for the image file
            //and set the eventImage state variable to the URL of the image file
            setEventImage(URL.createObjectURL(file));
        }
    };
    return(
        <div style={{padding:"20px",backgroundColor:"#f0f0f0",borderRadius:"10px"}}>
            <h2>Create New Event</h2>
            <form onSubmit={handlesubmit}>
                {/* onchange is an event handler which will be called when the value of the input field is changed */}
                <input 
                type="text"
                className='form-control mb-2'
                placeholder="Event Name" 
                value={eventName} 
                onChange={(e)=>setEventName(e.target.value)} 
                required></input>
                <br></br>
                <input 
                className='form-control mb-2' 
                type="date" 
                placeholder="Event Date" 
                value={eventDate} 
                onChange={(e)=>setEventDate(e.target.value)} 
                required></input>
                <br></br>
                <input 
                className='form-control mb-2' 
                type="time" 
                placeholder="Event Time" 
                value={eventTime} 
                onChange={(e)=>setEventTime(e.target.value)} 
                required></input>
                <br></br>
                <input 
                className='form-control mb-2' 
                type="text" 
                placeholder="Event Location" 
                value={eventLocation} 
                onChange={(e)=>setEventLocation(e.target.value)} 
                required></input>
                <br></br>
                <textarea
                className='form-control mb-2' 
                placeholder="Event Description" 
                value={eventDescription} 
                onChange={(e)=>setEventDescription(e.target.value)} 
                required></textarea>
                <br></br>
                <input 
                className='form-control mb-2' 
                type="text" 
                placeholder="Event Organizer" 
                value={eventOrganizer} 
                onChange={(e)=>setEventOrganizer(e.target.value)} 
                required></input>
                <br></br>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder="Event Contact" 
                value={eventContact} 
                onChange={(e)=>setEventContact(e.target.value)} 
                required></input>
                <br></br>
                {/* input type="file" will allow the user to select an image file from the computer */}
                {/* onChange is an event handler which will be called when the user selects an image file */}
                {/* accept='image/*' will allow only image files to be selected */}
                {/*Just after selecting an image handleImageupload function will work */}
                {/* and set the eventImage state variable to the URL of the image file */}
                <input
                className='form-control mb-2' 
                type="file" 
                onChange={handleImageupload} 
                accept='image/*' 
                required></input>
                <br></br>
                <input
                className='form-control mb-2' 
                type="text" 
                placeholder="Event Registration Link" 
                value={eventRegistrationLink} 
                onChange={(e)=>setEventRegistrationLink(e.target.value)} 
                required></input>
                <br></br>
                {/* input type="submit" will submit the form and call the handlesubmit function */}
                <button 
                className='form-control mb-2'
                type="submit">Add Event</button>
            </form>
            <h2>Event List</h2>
            {/* ul is an unordered list which will display the list of events created by the user */}
            {/* map is a function which will iterate over the events array and return a list of events */}
            <ul style={{listStyleType:"none",padding:"0"}}>
                {/* events is a state variable which will store the list of events created by the user */}
                {/* setEvents is a function which will set the value of events */}
                {events.map((event,index)=>(
                    <li key={index} style={{border:"1px solid #ccc",padding:"10px",margin:"10px"}}>
                        {/* event is an object which will store the details of the event created by the user */}
                        {/* index is the index of the event in the events array */}
                        {/* key is a unique identifier for each event in the list */}
                        <h3>{event.name}</h3>
                        {/*Here string is used for*/}
                        <p><strong>Date : </strong>{event.date} | <strong>Time : </strong>{event.time}</p>
                        <p><strong>Location : </strong>{event.location}</p>
                        {event.image &&( <img 
                        src={event.image}
                        alt="Event"
                        style={{width:"100%",height:"auto",margin:"10px 0",borderRadius:"10px"}}
                        />
                        )}
                        <p><strong>Description : </strong>{event.description}</p>
                        <p><strong>Organizer : </strong>{event.organizer} | <strong>Contact : </strong> {event.contact} </p>
                        {/**/}
                        <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">Register Here</a>
                        <iframe
                        width="100%"
                        height="250px"
                        style={{border: "0", marginTop: "10px"}}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                        title={`Map of ${event.location}`}
                        allowFullScreen
                        ></iframe>
                    </li>
                ))} 
            </ul>
        </div>
    );
}

export default CreateEvent; 