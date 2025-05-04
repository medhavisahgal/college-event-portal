import React, { useState } from 'react';
function CreateEventForm({ onAddEvent }) {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventOrganizer, setEventOrganizer] = useState('');
    const [eventContact, setEventContact] = useState('');
    const [eventImage, setEventImage] = useState(null);
    const [eventRegistrationLink, setEventRegistrationLink] = useState('');

    const handleImageupload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert('Image size should be less than 1MB');
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setEventImage(reader.result);
            };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
            timestamp: new Date()
        });
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
        <form onSubmit={handleSubmit}>
            <input type="text" 
            className='form-control mb-2' 
            placeholder="Event Name" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            required />
            <input 
            className='form-control mb-2' 
            type="date" 
            placeholder="Event Date" 
            value={eventDate} 
            onChange={(e) => setEventDate(e.target.value)} 
            required />
            <input 
            className='form-control mb-2' 
            type="time" 
            placeholder="Event Time" 
            value={eventTime} 
            onChange={(e) => setEventTime(e.target.value)} 
            required />
            <input 
            className='form-control mb-2' 
            type="text" 
            placeholder="Event Location" 
            value={eventLocation} 
            onChange={(e) => setEventLocation(e.target.value)} 
            required />
            <textarea 
            className='form-control mb-2' 
            placeholder="Event Description" 
            value={eventDescription} 
            onChange={(e) => setEventDescription(e.target.value)} 
            required />
            <input 
            className='form-control mb-2' 
            type="text" 
            placeholder="Event Organizer" 
            value={eventOrganizer} 
            onChange={(e) => setEventOrganizer(e.target.value)} 
            required />
            <input 
            className='form-control mb-2' 
            type="text" 
            placeholder="Event Contact" 
            value={eventContact} onChange={(e) => setEventContact(e.target.value)} 
            required />
            <input 
            className='form-control mb-2' 
            type="file" accept='image/*' 
            onChange={handleImageupload} 
            required />
            <input 
            className='form-control mb-2' 
            type="text" 
            placeholder="Event Registration Link" 
            value={eventRegistrationLink} 
            onChange={(e) => setEventRegistrationLink(e.target.value)} 
            required />
            <button 
            className='form-control mb-2' 
            type="submit">Add Event</button>
        </form>
    );
}

export default CreateEventForm;
