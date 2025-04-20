import { Helmet } from "react-helmet-async";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="flex min-h-screen flex-col bg-background dark:bg-gray-900 dark:text-white">
      <Header />
      <Helmet>
        <title>Home - Fixify</title>
      </Helmet>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
