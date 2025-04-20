"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  LogOut,
  User,
  Plus,
  Settings,
  List,
  CheckSquare,
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";
import { useSearch } from "../../contexts/SearchContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function Header() {
  const { user, Logout } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search visibility based on route
  useEffect(() => {
    if (pathname === "/services") {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [pathname]);

  // Handle logout
  function handleLogout() {
    Logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  }

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "G";
    const name = user.displayName || user.name || "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="mr-2 md:hidden">
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader className="mb-6">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/services"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      Services
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/about"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      About Us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/contact"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      Contact
                    </Link>
                  </SheetClose>

                  {user && (
                    <>
                      <div className="px-3 py-2">
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                          Dashboard
                        </h3>
                        <div className="flex flex-col gap-1 pl-2">
                          <SheetClose asChild>
                            <Link
                              to="/dashboard/add-service"
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                            >
                              <Plus className="h-4 w-4" />
                              Add Service
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              to="/dashboard/manage-service"
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                            >
                              <Settings className="h-4 w-4" />
                              Manage Service
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              to="/dashboard/booked-services"
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                            >
                              <List className="h-4 w-4" />
                              Booked Services
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              to="/dashboard/service-to-do"
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                            >
                              <CheckSquare className="h-4 w-4" />
                              Service To-Do
                            </Link>
                          </SheetClose>
                        </div>
                      </div>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              {/* <img
                src="/logo-removebg-preview (1).png"
                alt="Fixify Logo"
                className="h-10 w-10"
              /> */}
              <span className="hidden text-xl font-bold sm:inline-block dark:text-white">
                Fixify
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/services" ? "text-primary" : "text-foreground"
              }`}
            >
              Services
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/about" ? "text-primary" : "text-foreground"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/contact" ? "text-primary" : "text-foreground"
              }`}
            >
              Contact
            </Link>

            {user && (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">
                      Dashboard
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/dashboard/add-service"
                              className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent"
                            >
                              <Plus className="h-4 w-4" />
                              Add Service
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/dashboard/manage-service"
                              className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent"
                            >
                              <Settings className="h-4 w-4" />
                              Manage Service
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/dashboard/booked-services"
                              className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent"
                            >
                              <List className="h-4 w-4" />
                              Booked Services
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/dashboard/service-to-do"
                              className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent"
                            >
                              <CheckSquare className="h-4 w-4" />
                              Service To-Do
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </nav>

          {/* Right Side - Search, Theme Toggle, User Menu */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative hidden sm:block"
              >
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[200px] pl-9 md:w-[250px]"
                />
              </motion.div>
            )}

            {/* User Menu or Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.photoURL || "/placeholder.svg"}
                        alt={user.displayName || "User"}
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user.displayName || user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex cursor-pointer items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="ml-2">
                <Link to="/auth/login">Log in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
