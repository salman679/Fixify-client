import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import AllServicesPage from "../components/services/AllServices";
import ServiceDetails from "../components/services/ServiceDetails";
import ConfirmBooking from "../components/services/ConfirmBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <>Error</>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <AllServicesPage />,
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/booking/:id",
        element: <ConfirmBooking />,
      },

      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "dashboard",
        children: [
          {
            path: "add-service",
            element: <div>Add Service</div>,
          },
          {
            path: "manage-service",
            element: <div>Manage Service</div>,
          },
          {
            path: "booked-services",
            element: <div>My Bookings</div>,
          },
          {
            path: "service-to-do",
            element: <div>Service To Do</div>,
          },
        ],
      },
    ],
  },
]);
