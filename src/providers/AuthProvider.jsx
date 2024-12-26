import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { AuthContext } from "../contexts/AuthContext";
import { Auth } from "../firebase/firebase.init";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  function createUser(user) {
    setLoading(true);
    return createUserWithEmailAndPassword(Auth, user.email, user.password);
  }

  function updateUser(user) {
    setLoading(true);
    return updateProfile(Auth.currentUser, user);
  }

  function signIn(user) {
    setLoading(true);
    return signInWithEmailAndPassword(Auth, user.email, user.password);
  }

  function Logout() {
    setUser(null);
    setLoading(true);
    return signOut(Auth);
  }

  function signInWithGoogle() {
    setLoading(true);
    return signInWithPopup(Auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      if (currentUser) {
        const user = {
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };

        axios
          .post(`${import.meta.env.VITE_MAIN_URL}/jwt`, user, {
            withCredentials: true,
          })
          .then((data) => console.log(data));
        setUser(currentUser);
        setLoading(false);
      } else {
        axios.post(
          `${import.meta.env.VITE_MAIN_URL}/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        updateUser,
        signIn,
        Logout,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
