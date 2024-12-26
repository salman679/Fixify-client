import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <section className="flex items-center h-screen p-16 bg-base-200 text-base-content">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-primary">404</h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Oops! Page not found.
          </p>
          <p className="mt-4 mb-8 text-lg text-gray-500">
            The page you’re looking for doesn’t exist.
          </p>
          <Link to="/" className="btn btn-primary btn-wide">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
