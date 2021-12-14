import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

import { useVerifCode } from "./useVerifCode";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [resUser, setResUser] = useState({});
  const { dispatch } = useAuthContext();

  const { generateAndSendCode, isSent, setIsSent, sentCode } = useVerifCode();

  let navigate = useNavigate();

  const checkCode = async (verifCode, displayName) => {
    if (verifCode === sentCode) {
      setError(null);
      // add display name to user
      await updateProfile(auth.currentUser, { displayName });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: resUser });
      navigate("/signin");
    } else {
      setError("Wrong Code");
      setIsSent(false);
      navigate("/signin");
    }
  };

  const signup = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (res.user) {
        setResUser(res.user);
        generateAndSendCode(email);

        setIsSent(true);
      } else {
        throw new Error("Could not complete signup");
      }

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { checkCode, signup, isSent, isPending, error };
};
