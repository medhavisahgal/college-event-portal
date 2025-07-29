import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { db, auth } from '../firebase';
import EventList from './EventList';
import CreateEventForm from './CreateEventForm'; // We'll need the form for the modal
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation to get state
import { useAuthState } from 'react-firebase-hooks/auth'; // To check auth state and get user
import Modal from './Modal'; // We'll create this component next

function Dashboard() {
    const [user, loadingAuth, errorAuth] = useAuthState(auth); // Get auth state
    const [events, setEvents] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loadingRole, setLoadingRole] = useState(true);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false); // State to control modal visibility

    const navigate = useNavigate();
    const location = useLocation(); // Hook to access navigation state

    // Function to fetch the user's role from Firestore
    const fetchUserRole = async (uid) => {
        if (!uid) {
            setUserRole('user'); // Default to user if no UID
            setLoadingRole(false);
            return;
        }
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDocSnap = await getDocs(userDocRef);

            let role = 'user'; // Default role is user
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData && userData.role) { // Check if userData and role exist
                    role = userData.role;
                } else {
                    console.warn(`No role field found for user ${uid} in Dashboard document. Defaulting to 'user'.`);
                }
            } else {
                console.warn(`No user document found for user ${uid} in Dashboard. Defaulting to 'user'.`);
            }
            setUserRole(role); // Set the fetched or defaulted role
        } catch (error) {
            console.error("Error fetching user role:", error);
            setUserRole('user'); // Default to 'user' on error
        } finally {
            setLoadingRole(false);
        }
    };


    // Function to fetch events from Firestore
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

    // Function to handle adding a new event
    const handleAddEvent = async (eventData) => {
        try {
            await addDoc(collection(db, "events"), eventData);
            fetchEvents(); // Refresh the list after adding
            alert('Event Created Successfully!');
            setShowCreateEventModal(false); // Close the modal on success
        } catch (error) {
            console.error("Error adding event: ", error);
            alert('Something went wrong! Please try again.');
        }
    };

    // Function to handle deleting an event
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

    // Handle logout
    function handleLogout() {
        navigate('/logout');
    }

    // Fetch events when the component mounts or user changes
    useEffect(() => {
        if (user) {
             fetchUserRole(user.uid); // Fetch role after auth state is confirmed
             fetchEvents(); // Fetch events once on mount/user change
        } else if (!loadingAuth) {
            // If not loading auth and no user, redirect to login
             navigate('/login');
        }
    }, [user, loadingAuth, navigate]); // Depend on user and loadingAuth state

    // Show loading or error state
    if (loadingAuth || loadingRole) {
        return <div>Loading dashboard...</div>;
    }

    if (errorAuth) {
        console.error("Auth error in Dashboard:", errorAuth);
        return <div>Error loading user. Please try logging in again.</div>;
    }

     // If no user and not loading, redirect should have happened in useEffect
     if (!user) {
         return null; // Or a loading indicator, though redirect should prevent this
     }


    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#f5f5f5',
                padding: '2rem'
            }}
        >
            {/* Header/Dashboard Title Bar */}
            <div style={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 background: 'white',
                 padding: '1rem 2rem',
                 borderRadius: '8px',
                 boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                 marginBottom: '2rem'
            }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#19c94a' }}>KIIT Event Dashboard</span>

                {/* Conditionally render Create Event button for admins */}
                {userRole === 'admin' && (
                     <button onClick={() => setShowCreateEventModal(true)} style={{
                        background: '#19c94a',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        padding: '0.5rem 1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        marginRight: '1rem' // Space between this button and logout
                    }}>
                        Create Event
                    </button>
                )}

                <button onClick={handleLogout} style={{
                    background: '#fff',
                    color: '#19c94a',
                    border: '1px solid #19c94a',
                    borderRadius: 4,
                    padding: '0.3rem 1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem'
                }}>
                    Logout
                </button>
            </div>

            {/* Event List Section */}
             <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}>
                {/* Heading for the Event List section */}
                <h2 style={{ color: '#19c94a', textAlign: 'center', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.5rem' }}>Event List</h2>

                {/* Rendering the EventList component */}
                <EventList events={events} onDeleteEvent={handleDeleteEvent} />
            </div>

            {/* Modal for Create Event Form */}
            <Modal show={showCreateEventModal} onClose={() => setShowCreateEventModal(false)}>
                 <CreateEventForm onAddEvent={handleAddEvent} />
            </Modal>
        </div>
    );
}

export default Dashboard; 