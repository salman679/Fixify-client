"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  ImageIcon,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUp() {
  const { updateUser, createUser, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const photoUrl = formData.get("photoUrl");
    const password = formData.get("password");

    const user = { displayName: name, email, password, photoURL: photoUrl };

    if (!user.displayName || !user.email || !user.password) {
      setIsLoading(false);
      return Swal.fire({
        icon: "error",
        title: "All fields are required",
        showConfirmButton: true,
        timer: 1500,
      });
    }

    // Reset error message
    setErrorMessage("");

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

    if (!passwordValidation.test(user.password)) {
      setIsLoading(false);
      return setErrorMessage(
        "Password must contain at least 6 characters, one uppercase letter, one lowercase letter and one number"
      );
    }

    createUser(user)
      .then(() => {
        updateUser(user)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500,
            });

            navigate("/");
            event.target.reset();
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }

  async function handleGoogleLogin() {
    try {
      setIsLoading(true);
      signInWithGoogle()
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      Swal.fire("Error", error.message, "error");
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Sign Up - Fixify</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg dark:bg-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoUrl">Photo URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="photoUrl"
                    name="photoUrl"
                    type="url"
                    placeholder="Enter your photo URL"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <Alert variant="destructive" className="text-sm py-2">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleLogin}
              className="w-full"
              disabled={isLoading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
                Login <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
