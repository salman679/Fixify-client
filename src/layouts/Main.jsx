import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-320px)] dark:bg-gray-800 dark:text-white">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
