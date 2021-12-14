import axios from "axios";
import { useState } from "react";

export const useVerifCode = () => {
  const [isSent, setIsSent] = useState(false);
  const [sentCode, setSentCode] = useState("");

  const generateAndSendCode = async (to) => {
    let code = Math.floor(100000 + Math.random() * 900000);
    try {
      await axios.post("http://localhost:3005/sendVerifEmail", { code, to });
      setIsSent(true);
      setSentCode(String(code));
    } catch (err) {
      console.log(err);
    }
  };

  return { generateAndSendCode, isSent, setIsSent, sentCode, setSentCode };
};
