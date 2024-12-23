import { useEffect, useState } from "react";

import PropTypes from "prop-types";
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
    setLoading(false);
    return createUserWithEmailAndPassword(Auth, user.email, user.password);
  }

  function updateUser(user) {
    setLoading(false);
    return updateProfile(Auth.currentUser, user);
  }

  function signIn(user) {
    setLoading(false);
    return signInWithEmailAndPassword(Auth, user.email, user.password);
  }

  function Logout() {
    setUser(null);
    setLoading(false);
    return signOut(Auth);
  }

  function signInWithGoogle() {
    return signInWithPopup(Auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
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
