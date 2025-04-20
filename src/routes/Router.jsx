import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import AllServicesPage from "../components/services/AllServices";
import ServiceDetails from "../components/services/ServiceDetails";
import ConfirmBooking from "../components/services/ConfirmBooking";
import AddService from "../pages/dashboard/AddService";
import BookedServices from "../pages/dashboard/BookedServices";
import PrivateRoute from "./PrivateRoute";
import ManageServices from "../pages/dashboard/ManageServices";
import ServiceToDo from "../pages/dashboard/ServiceToDo";
import UpdateService from "../pages/dashboard/UpdateService";
import ErrorPage from "../components/error/ErrorPage";
import AboutUs from "@/components/about/About";
import ContactPage from "@/components/contact/ContactPage";
import FAQ from "@/components/FAQ/FAQ";
import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";
import TermsOfService from "@/components/terms-of-service/TermsOfService";

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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
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
