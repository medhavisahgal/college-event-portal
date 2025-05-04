import React from 'react';

function EventList({ events, onDeleteEvent }) {
    return (
        <ul style={{ listStyleType: "none", padding: "0" }}>
            {events.map((event, index) => (
                <li key={event.id || index} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                    <h3>{event.name}</h3>
                    <p><strong>Date : </strong>{event.date} | <strong>Time : </strong>{event.time}</p>
                    <p><strong>Location : </strong>{event.location}</p>
                    {event.image && (
                        <img
                            src={event.image}
                            alt="Event"
                            style={{ width: "100%", height: "auto", margin: "10px 0", borderRadius: "10px" }}
                        />
                    )}
                    <p><strong>Description : </strong>{event.description}</p>
                    <p><strong>Organizer : </strong>{event.organizer} | <strong>Contact : </strong> {event.contact} </p>
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">Register Here</a>
                    <iframe
                        width="100%"
                        height="250px"
                        style={{ border: "0", marginTop: "10px" }}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                        title={`Map of ${event.location}`}
                        allowFullScreen
                    ></iframe>
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

export default EventList;
