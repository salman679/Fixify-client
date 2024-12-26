# **Service Sharing Web Application**

A service-sharing platform that allows users to add, update, and manage services, book services, and track the status of their bookings. This app is designed to create a user-friendly service-sharing experience with features for both service providers and users.

🔗 **Live Site URL:** [Service Sharing Web App Live](your-live-url.com)

## **Category:**

`assignment_category_02`

## **Features:**

- **🔐 Secure Login & Registration** – Login with email/password or Google authentication.
- **🛠️ Add & Manage Services** – Users can add, update, and delete their own services.
- **🔍 Browse & Book Services** – Search for services, view details, and book services with an easy-to-use interface.
- **🔄 Service Status Tracking** – Users and service providers can update the status of booked services.
- **🌐 Responsive Design** – Fully responsive across mobile, tablet, and desktop views.

## **Pages & Routes:**

- **Login Page**: Email/password-based login or Google Sign-In.
- **Registration Page**: Simple registration form with email, password, and additional fields for name, email, and photo URL.
- **Home Page**: The main landing page with a banner, featured services, and extra sections.
- **All Services Page**: Displays all available services, with options to view details or book.
- **Single Service Page**: Displays detailed information about a service with a "Book Now" button.
- **Add Service Page**: Allows service providers to add new services.
- **Manage Services Page**: Allows users to manage (update or delete) the services they've added.
- **Booked Services Page**: Shows the services that the user has booked.
- **Service To Do Page**: Shows services booked by other users that the service provider is handling, with a status update option.

## **Technologies Used:**

- **Frontend:** React, Tailwind CSS, Framer Motion (for animations)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase (Email/Password & Google)
- **State Management:** JWT (JSON Web Tokens)
- **Others:** React Router for routing, Axios for HTTP requests

## **Installation Instructions:**

1. Clone the repository for both the client and server side:

   ```bash
   git clone https://github.com/salman679/Fixify-client.git
   git clone https://github.com/salman679/Fixify-server.git
   ```

2. Install dependencies for both the client and server:

   ```bash
   cd client-side
   npm install
   cd ../server-side
   npm install
   ```

3. Set up environment variables in the server folder (e.g., Firebase config, MongoDB credentials).

4. Run the client-side and server-side applications:
   - Client:
     ```bash
     cd client-side
     npm start
     ```
   - Server:
     ```bash
     cd server-side
     npm start
     ```

## **Deployment:**

- **Frontend:** Deployed on Netlify, Vercel, or any other static hosting platform.
- **Backend:** Deployed on Heroku or any server hosting platform.

## **Challenges:**

- **Service Status Management** – Users and service providers can update the status of their services in real-time.
- **JWT Authentication** – Implemented token-based authentication for secure private routes.
- **Theme Toggle** – The system allows users to toggle between light and dark modes.
- **Search Functionality** – Real-time search system to find services by name or description.
