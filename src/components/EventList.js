// Importing React library to use JSX and components
import React from 'react';
// EventList is a functional component that takes in props: events (array of event objects) and onDeleteEvent (function to delete an event)
function EventList({ events, onDeleteEvent }) {
    return (
        // Unordered list to display all events
        <ul style={{
            listStyleType: "none",
            padding: 0,
            maxWidth: 700,
            margin: "0 auto"
        }}>
            {/* Loop through each event and display its details */}
            {events.length === 0 && (
                <div style={{ textAlign: 'center', color: '#888', margin: '2rem 0' }}>
                    No events yet!
                </div>
            )}
            {events.map((event, index) => (
                // Each event is shown as a list item with border and padding
                <li
                    key={event.id || index}
                    style={{
                        background: "white",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        padding: "1.5rem",
                        margin: "1.5rem 0"
                    }}
                >
                    {/* Event Name */}
                    <h3 style={{
                        color: "#19c94a",
                        marginBottom: "0.5rem",
                        fontWeight: "bold",
                        fontSize: "1.3rem"
                    }}>
                        {event.name}
                    </h3>
                    {/* Date and Time of the event */}
                    <p style={{ margin: "0.5rem 0" }}>
                        <strong>Date:</strong> {event.date} &nbsp; | &nbsp;
                        <strong>Time:</strong> {event.time}
                    </p>
                    {/* Location of the event */}
                    <p style={{ margin: "0.5rem 0" }}>
                        <strong>Location:</strong> {event.location}
                    </p>
                    {/* Show image if the event has one */}
                    {event.image && (
                        <img
                            src={event.image}
                            alt={event.name + ' image'}
                            style={{
                                width: "100%",
                                height: "auto",
                                margin: "10px 0",
                                borderRadius: "10px",
                                objectFit: "cover"
                            }}
                        />
                    )}
                    {/* Description of the event */}
                    <p style={{ margin: "0.5rem 0" }}>
                        <strong>Description:</strong> {event.description}
                    </p>
                    {/* Organizer and their contact details */}
                    <p style={{ margin: "0.5rem 0" }}>
                        <strong>Organizer:</strong> {event.organizer} &nbsp; | &nbsp;
                        <strong>Contact:</strong> {event.contact}
                    </p>
                    {/* Registration link for the event (opens in new tab) */}
                    <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#19c94a",
                            textDecoration: "underline",
                            display: "inline-block",
                            marginBottom: "0.5rem"
                        }}
                    >
                        Register Here
                    </a>
                    {/* Embedded Google Map based on event location */}
                    <div style={{ margin: "1rem 0" }}>
                        <iframe
                            width="100%"
                            height="200px"
                            style={{ border: "0", borderRadius: "10px" }}
                            src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                            title={`Map of ${event.location}`}
                            allowFullScreen
                        ></iframe>
                    </div>
                    {/* Button to delete the event - calls the onDeleteEvent function with the event's ID */}
                    <button
                        aria-label={`Delete event ${event.name}`}
                        style={{
                            margin: "10px 0",
                            background: "#e74c3c",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontWeight: "bold"
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
