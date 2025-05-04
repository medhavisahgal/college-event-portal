// Importing React library to use JSX and components
import React from 'react';
// EventList is a functional component that takes in props: events (array of event objects) and onDeleteEvent (function to delete an event)
function EventList({ events, onDeleteEvent }) {
    return (
        // Unordered list to display all events
        <ul style={{ listStyleType: "none", padding: "0" }}>
            {/* Loop through each event and display its details */}
            {events.map((event, index) => (
                // Each event is shown as a list item with border and padding
                <li key={event.id || index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                    {/* Event Name */}
                    <h3>{event.name}</h3>
                    {/* Date and Time of the event */}
                    <p><strong>Date : </strong>{event.date} | <strong>Time : </strong>{event.time}</p>
                    {/* Location of the event */}
                    <p><strong>Location : </strong>{event.location}</p>
                    {/* Show image if the event has one */}
                    {event.image && (
                        <img
                            src={event.image}
                            alt="Event"
                            style={{ width: "100%", height: "auto", margin: "10px 0", borderRadius: "10px" }}
                        />
                    )}
                    {/* Description of the event */}
                    <p><strong>Description : </strong>{event.description}</p>
                    {/* Organizer and their contact details */}
                    <p><strong>Organizer : </strong>{event.organizer} | <strong>Contact : </strong> {event.contact} </p>
                    {/* Registration link for the event (opens in new tab) */}
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">Register Here</a>
                    {/* Embedded Google Map based on event location */}
                    <iframe
                        width="100%"
                        height="250px"
                        style={{ border: "0", marginTop: "10px" }}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                        title={`Map of ${event.location}`}
                        allowFullScreen
                    ></iframe>
                    {/* Button to delete the event - calls the onDeleteEvent function with the event's ID */}
                    <button
                        style={{
                            margin: "10px 0",
                            background: "#e74c3c",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer"
                        }}
                        onClick={() => onDeleteEvent(event.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

// Exporting the component to use it in other files
export default EventList;
