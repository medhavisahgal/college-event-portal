import React, { useState } from 'react';
// This component provides a form to create a new event
function CreateEventForm({ onAddEvent }) {
    // Define state variables for each input field in the form
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventOrganizer, setEventOrganizer] = useState('');
    const [eventContact, setEventContact] = useState('');
    const [eventImage, setEventImage] = useState(null);
    const [eventRegistrationLink, setEventRegistrationLink] = useState('');
    // Handle image upload and convert to Base64 format if under 1MB
    const handleImageupload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            if (file.size > 1024 * 1024) { // Check if size > 1MB
                alert('Image size should be less than 1MB');
                return;
            }
            const reader = new FileReader(); // Create a FileReader to read the file
            reader.readAsDataURL(file); // Read the file as base64 string
            reader.onload = () => {
                setEventImage(reader.result); // Store the result in state
            };
        }
    };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submit behavior
        // Pass the new event data to the parent component
        onAddEvent({
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
            organizer: eventOrganizer,
            contact: eventContact,
            image: eventImage,
            registrationLink: eventRegistrationLink,
            timestamp: new Date() // Store the time when event is created
        });
        // Clear the form inputs after submission
        setEventName('');
        setEventDate('');
        setEventTime('');
        setEventLocation('');
        setEventDescription('');
        setEventOrganizer('');
        setEventContact('');
        setEventImage(null);
        setEventRegistrationLink('');
    };
    return (
        // Render the event creation form
        <form onSubmit={handleSubmit}>
            {/* Input for event name */}
            <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 4
                }}
            />
            {/* Input for event date */}
            <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 4
                }}
            />
            {/* Input for event time */}
            <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                required
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 4
                }}
            />
            {/* Input for event location */}
            <input
                type="text"
                placeholder="Event Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                required
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 4
                }}
            />
            {/* Textarea for event description */}
            <textarea
                placeholder="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 4
                }}
            />
            {/* Input for organizer name */}
            <input
                type="text"
                placeholder="Event Organizer"
                value={eventOrganizer}
                onChange={(e) => setEventOrganizer(e.target.value)}
                required
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 4
                }}
            />
            {/* Input for contact info */}
            <input
                type="text"
                placeholder="Event Contact"
                value={eventContact}
                onChange={(e) => setEventContact(e.target.value)}
                required
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 4
                }}
            />
            {/* Input for uploading event image */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageupload}
                required
                style={{
                    marginBottom: '1rem'
                }}
            />
            {/* Input for registration link */}
            <input
                type="text"
                placeholder="Event Registration Link"
                value={eventRegistrationLink}
                onChange={(e) => setEventRegistrationLink(e.target.value)}
                required
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: 4
                }}
            />
            {/* Submit button */}
            <button
                type="submit"
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#19c94a',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                Create Event
            </button>
        </form>
    );
}

export default CreateEventForm;
