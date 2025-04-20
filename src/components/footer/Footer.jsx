import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Footer() {
  return (
    <footer className="border-t bg-background dark:border-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link to="/" className="mb-4 flex items-center gap-2">
              {/* <img
                src="/logo-removebg-preview (1).png"
                alt="Fixify Logo"
                className="h-12 w-12"
              /> */}
              <span className="text-2xl font-bold">Fixify</span>
            </Link>
            <p className="mb-6 text-muted-foreground">
              Simplifying your repairs and services, one click at a time!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/salman.izhar.2024/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="https://www.instagram.com/mdsalmanizhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/salman-izhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:support@fixify.com"
                    className="transition-colors hover:text-primary"
                  >
                    support@fixify.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a
                    href="tel:+8801234567890"
                    className="transition-colors hover:text-primary"
                  >
                    +880 123 456 789
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <address className="not-italic">
                    456 Service Avenue, Dhaka
                  </address>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-muted-foreground">
              Subscribe to our newsletter for updates and offers
            </p>
            <div className="space-y-3">
              <Input type="email" placeholder="Your email address" />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Fixify. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link
                to="/terms"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy-policy"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
