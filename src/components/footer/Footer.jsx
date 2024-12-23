import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className=" bg-gray-300 border-t dark:bg-gray-800 dark:text-white py-8 px-4">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Website Name */}
          <div>
            <h2 className="text-2xl font-bold">Fixify</h2>
            <p className="mt-2">
              Simplifying your repairs and services, one click at a time!
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="mt-2">
              <li>Email: support@fixify.com</li>
              <li>Phone: +880 123 456 789</li>
              <li>Address: 456 Service Avenue, Dhaka</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://web.facebook.com/salman.izhar.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebookF size={24} />
              </a>

              <a
                href="https://www.instagram.com/mdsalmanizhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/salman-izhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-6 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Fixify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
