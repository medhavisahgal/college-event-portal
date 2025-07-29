import React from 'react';

function Modal({ show, onClose, children }) {
    // If show is false, don't render anything
    if (!show) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed', // Fixed position covers the whole viewport
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            display: 'flex',
            justifyContent: 'center', // Center content horizontally
            alignItems: 'center', // Center content vertically
            zIndex: 1000 // Ensure the modal is on top of other content
        }} onClick={onClose}> {/* Clicking the overlay closes the modal */}
            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '500px', // Limit the width of the modal content
                width: '90%', // Make it responsive
                maxHeight: '90%', // Limit the height
                overflowY: 'auto', // Add scroll if content is too tall
                position: 'relative' // Needed for absolute positioning of the close button
            }} onClick={e => e.stopPropagation()}> {/* Stop click propagation to prevent closing when clicking inside */}
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#aaa' // Grey color for the close button
                    }}
                >
                    &times; {/* 'times' entity is a multiplication sign, often used for close buttons */}
                </button>
                {children} {/* Render the content passed to the modal */}
            </div>
        </div>
    );
}

export default Modal; 