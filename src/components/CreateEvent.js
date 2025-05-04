//imported react and useState from react library , we will use useState to manage the state or storing the input data in the memory of the component
import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import CreateEventForm from './CreateEventForm';
import EventList from './EventList';

//create a functional component named CreateEvent which will return a html(jsx) structure of the form to create an event
//and also a list of events created by the user
function CreateEvent() {
    //events is a state variable which will store the list of events created by the user
    //setEvents is a function which will set the value of events
    //After a new event is created a new event object is created and pushed to the events array
    //initial value of events is an empty array
    const [events, setEvents] = useState([]);
    //useEffect is a hook which will run the function inside it when the component is mounted
    //it will fetch the events from the firestore database and set the value of events to the list of events fetched from the database
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            const eventsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEvents(eventsList);
        } catch (error) {
            console.error("Error fetching events:", error);
            alert('Something went wrong while fetching events!');
        }
    };

    //handlesubmit is a function which will be called when the form is submitted
    //async is used to make the function asynchronous so that we can use await keyword inside the function
    //await is used to wait for the addDoc function to complete before moving to the next line of code
    //addDoc is a function which will add the new event object to the events collection in the firestore database
    //collection is a function which will return a reference to the events collection in the firestore database
    const handleAddEvent = async (eventData) => {
        try {
            await addDoc(collection(db, "events"), eventData);
            fetchEvents(); // Refresh the list after adding
            alert('Event Created Successfully!');
        } catch (error) {
            console.error("Error adding event: ", error);
            alert('Something went wrong! Please try again.');
        }
    };

    //handleDelete is a function which will be called when the user wants to delete an event
    //eventId is the id of the event to be deleted
    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteDoc(doc(db, "events", eventId));
            setEvents(events.filter(event => event.id !== eventId));
            alert('Event deleted successfully!');
        } catch (error) {
            console.error("Error deleting event: ", error);
            alert('Failed to delete event.');
        }
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
            <h2>Create New Event</h2>
            <CreateEventForm onAddEvent={handleAddEvent} />
            <h2>Event List</h2>
            <EventList events={events} onDeleteEvent={handleDeleteEvent} />
        </div>
    );
}

export default CreateEvent; 