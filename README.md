# 🎓 KIIT Event Portal

A modern, role-based event management system built for KIIT University students and administrators. This web application allows students to view upcoming events while providing administrators with tools to create, manage, and delete events.

## ✨ Features

### 🔐 Authentication & Authorization

- **Secure Login/Signup**: Firebase Authentication with email/password
- **Domain Restriction**: Only `@kiit.ac.in` email addresses allowed
- **Role-Based Access Control**:
  - **Students**: View events, access registration links
  - **Administrators**: Create, edit, delete events + all student permissions

### 📅 Event Management

- **Create Events**: Rich form with event details, images, and registration links
- **Event Display**: Beautiful card-based layout with embedded Google Maps
- **Image Support**: Event image uploads (Base64, max 1MB)
- **Real-time Updates**: Instant UI updates after CRUD operations

### 🎨 User Experience

- **Responsive Design**: Mobile-friendly interface with Bootstrap integration
- **Modal Forms**: Clean, focused event creation experience
- **Interactive Maps**: Google Maps integration for event locations
- **Loading States**: Smooth user feedback during operations

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Bootstrap CSS + Inline Styles
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **State Management**: React Hooks (useState, useEffect)
- **Deployment**: Firebase Hosting ready

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/medhavisahgal/college-event-portal.git
   cd college-event-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Firebase Setup**

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Get your Firebase config

4. **Configure Firebase**

   - Replace the Firebase configuration in `src/firebase.js` with your project details:

   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id",
   };
   ```

5. **Set up Firestore Security Rules**

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /events/{eventId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null &&
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
     }
   }
   ```

6. **Run the application**

   ```bash
   npm start
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### For Students

1. **Sign Up**: Create account with your KIIT email (`@kiit.ac.in`)
2. **Login**: Access your account
3. **Browse Events**: View all upcoming events on the dashboard
4. **Register**: Click registration links to join events
5. **View Details**: See event information, location maps, and organizer contact

### For Administrators

1. **Login**: Access with admin credentials
2. **Create Events**: Use the "Create Event" button to add new events
3. **Manage Events**: Edit or delete existing events as needed
4. **Monitor**: Track event creation and student engagement

## 🏗️ Project Structure

```
college-event-portal/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   └── favicon.ico        # App icon
├── src/
│   ├── components/        # React components
│   │   ├── Auth/         # Authentication components
│   │   │   ├── Login.js      # User login
│   │   │   ├── Signup.js     # User registration
│   │   │   ├── Logout.js     # User logout
│   │   │   └── PrivateRoute.js # Route protection
│   │   ├── CreateEvent.js    # Event creation page
│   │   ├── CreateEventForm.js # Event form component
│   │   ├── Dashboard.js      # Main dashboard
│   │   ├── EventList.js      # Events display
│   │   └── Modal.js          # Modal component
│   ├── assets/           # Images and static files
│   ├── App.js            # Main app component
│   ├── firebase.js       # Firebase configuration
│   ├── index.js          # App entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
└── README.md            # Project documentation
```

## 🔧 Key Components

### Authentication System

- **Login.js**: Handles user authentication with domain validation
- **Signup.js**: User registration with profile creation
- **PrivateRoute.js**: Protects routes requiring authentication

### Event Management

- **CreateEventForm.js**: Comprehensive event creation form
- **EventList.js**: Displays events with rich information
- **Dashboard.js**: Main interface with role-based controls

### UI Components

- **Modal.js**: Reusable modal for forms and content
- **Responsive Design**: Mobile-first approach with Bootstrap

## 🚀 Deployment

### Firebase Hosting

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

## 🔒 Security Features

- **Email Domain Validation**: Restricts access to KIIT students
- **Role-Based Permissions**: Admins only can modify events
- **Protected Routes**: Authentication required for sensitive pages
- **Firebase Security Rules**: Database-level access control

## 🎯 Future Enhancements

- [ ] **Event Categories**: Organize events by type/department
- [ ] **Search & Filtering**: Find events by date, location, or keyword
- [ ] **Event Registration**: Track student registrations
- [ ] **Notifications**: Email/SMS reminders for upcoming events
- [ ] **Analytics Dashboard**: Event engagement metrics
- [ ] **Image Storage**: Move to Firebase Storage for better performance
- [ ] **Pagination**: Handle large numbers of events
- [ ] **Admin Panel**: Enhanced administrative tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Medhavi Sahgal** - [GitHub Profile](https://github.com/medhavisahgal)

⭐ **Star this repository if you found it helpful!**
