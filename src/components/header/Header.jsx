import { Link } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const { user, Logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return storedTheme ? storedTheme === "dark" : prefersDark;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  function handleLogout() {
    Logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  }

  return (
    <div className="dark:bg-gray-900">
      <div className="navbar container mx-auto flex justify-between items-center py-4 px-6">
        <div className="navbar-start w-auto">
          <Link to="/" className="btn btn-ghost dark:text-white text-xl">
            {/* <img
              src="/logo.png"
              alt="Fixify Logo"
              className="h-8 inline mr-2"
            /> */}
            Fixify
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="dark:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="dark:text-white">
                Services
              </Link>
            </li>
            {user ? (
              <li className="relative group">
                <button className="dark:text-white">Dashboard</button>
                <ul className="absolute hidden z-50 py-2 px-2 rounded-lg group-hover:block bg-white dark:bg-gray-800 shadow-lg dark:text-white mt-9 w-40">
                  <li>
                    <Link
                      to="/dashboard/add-service"
                      className="block px-4 py-2"
                    >
                      Add Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-service"
                      className="block px-4 py-2"
                    >
                      Manage Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/booked-services"
                      className="block px-4 py-2"
                    >
                      Booked-Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/service-to-do"
                      className="block px-4 py-2"
                    >
                      Service-To-Do
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <Link to="/auth/login" className="dark:text-white">
                  Log-in
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="py-2 p-2 mx-4 bg-gray-300 dark:bg-gray-700 rounded-full"
          >
            {darkMode ? (
              <MdLightMode className="text-xl" />
            ) : (
              <MdDarkMode className="text-xl" />
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end group">
              <div role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={user.photoURL || "/default-avatar.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 border dark:border-gray-700 shadow-md rounded-box z-50 w-52 p-2 dark:bg-gray-800 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200"
              >
                <li>
                  <a className="justify-between dark:text-white">
                    {user.displayName || user.name}
                  </a>
                </li>
                <li>
                  <Link onClick={handleLogout} className="dark:text-white">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/auth/login">
              <button className="btn">Log-in</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
