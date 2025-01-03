import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import AllServicesPage from "../components/services/AllServices";
import ServiceDetails from "../components/services/ServiceDetails";
import ConfirmBooking from "../components/services/ConfirmBooking";
import AddService from "../pages/AddService";
import BookedServices from "../pages/BookedServices";
import PrivateRoute from "./PrivateRoute";
import ManageServices from "../pages/ManageServices";
import ServiceToDo from "../pages/ServiceToDo";
import UpdateService from "../pages/UpdateService";
import ErrorPage from "../components/error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/booking/:id",
        element: (
          <PrivateRoute>
            <ConfirmBooking />
          </PrivateRoute>
        ),
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
            element: (
              <PrivateRoute>
                <AddService />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-service",
            element: (
              <PrivateRoute>
                <ManageServices />
              </PrivateRoute>
            ),
          },
          {
            path: "edit-service/:id",
            element: (
              <PrivateRoute>
                <UpdateService />
              </PrivateRoute>
            ),
          },
          {
            path: "booked-services",
            element: (
              <PrivateRoute>
                <BookedServices />
              </PrivateRoute>
            ),
          },
          {
            path: "service-to-do",
            element: <ServiceToDo />,
          },
        ],
      },
    ],
  },
]);
