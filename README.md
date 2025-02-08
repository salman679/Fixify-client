# Fixify - Service Sharing Web Application

## Overview
Fixify is a service-sharing web application designed to connect users with various service providers. Users can add, update, and delete their own services, browse services shared by others, book services, and manage the statuses of booked services. The platform offers a user-friendly experience with features for service management, service booking, and status updates.

## Live Site URL
[Fixify Live Site](https://fixify.com)

## Features
- **User Authentication**: Secure login and registration system with email/password and Google Sign-in.
- **Service Management**: Users can add, update, and delete their own services.
- **Service Booking**: Users can book services provided by others.
- **Status Updates**: Service providers can update the status of booked services (pending, working, completed).
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop views.
- **Dynamic Routing**: Dynamic titling and conditional rendering based on user authentication.
- **Search System**: Search services by name on the all services page.
- **Theme Customization**: Toggle between light and dark themes.
- **JWT Authentication**: Secure private routes using JWT tokens.

## Pages and Routes
- **Login**: Simple login system with email/password and Google Sign-in.
- **Registration**: Simple registration system with email/password and Google Sign-in.
- **Home**: Main landing page with a banner/slider, popular services, and extra sections.
- **All Services**: Public route showing all services available in the system.
- **Single Service**: Private route showing details of a specific service with a book now button.
- **Add-A-Service**: Private route for users to add new services.
- **Manage-Services**: Private route for users to manage their added services (update/delete).
- **Booked Service**: Private route showing services booked by the user.
- **Service To Do**: Private route showing services booked by other users where the current user is the service provider.
- **404 Error Page**: Custom error page for invalid routes.

## Technologies Used
- **Frontend**: React.js, Framer Motion, CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase Authentication, JWT
- **Deployment**: Netlify (Frontend), Vercel (Backend)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/salman679/Fixify-client.git
   cd fixify-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

For the server-side repository:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fixify-server.git
   cd fixify-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Environment Variables
Ensure you have the following environment variables set up:
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`
- `MONGO_URI`
- `JWT_SECRET`

## Optional Features Implemented
1. **Spinner**: Added a spinner for loading states.
2. **Pagination**: Implemented pagination on the all services page showing 6 services per page.

## Challenges
- **Dynamic Routing**: Ensuring users are not redirected to the login page on reloading private routes.
- **JWT Authentication**: Implementing JWT tokens for secure authentication and private routes.
- **Theme Customization**: Adding a theme toggling button for light and dark themes.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries, please contact [your email address].

---

Thank you for checking out Fixify! We hope you find it useful and enjoy using it as much as we enjoyed building it.
