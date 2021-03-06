import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

import { useVerifCode } from "./useVerifCode";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [resUser, setResUser] = useState({});
  const { dispatch } = useAuthContext();
  const { generateAndSendCode, isSent, setIsSent, sentCode } = useVerifCode();

  let navigate = useNavigate();

  const checkCode = async (verifCode) => {
    if (verifCode === sentCode) {
      setError(null);
      const { email, password } = resUser;

      const res = await signInWithEmailAndPassword(auth, email, password);

      dispatch({ type: "LOGIN", payload: res.user });
      navigate("/");
    } else {
      setError("Wrong Code");
      setIsSent(false);
      navigate("/signin");
    }
  };

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password);

      setResUser({ email, password });
      generateAndSendCode(email);
      setIsSent(true);

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

  return { checkCode, login, isSent, isPending, error };
};
