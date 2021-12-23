import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";

import "./SigninRight.css";

export default function SigninSignupRight() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetMail, setResetMail] = useState("");
  const [verifCode, setVerifCode] = useState("");
  const [isForgetPass, setIsForgetPass] = useState(false);

  const { checkCode, login, isSent, isPending, error } = useLogin();

  const auth = getAuth();
  const resetPass = (resetEmail) => {
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        console.log("email sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "password":
        setPassword(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "verifcode":
        setVerifCode(value);
        break;
      case "resetmail":
        setResetMail(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(email, password);

    setEmail("");
    setPassword("");
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    checkCode(verifCode);
    setVerifCode("");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    resetPass(resetMail);
    setIsForgetPass(false);
    setResetMail("");
  };

  return (
    <div className="sign-in-wrapper">
      {isSent ? (
        <div className="code-form">
          <form onSubmit={handleCodeSubmit}>
            <FormInput
              type="number"
              name="verifcode"
              value={verifCode}
              handleChange={handleChange}
              label="Doğrulama Kodu"
              required
            />
            <CustomButton type="submit">Onayla</CustomButton>
          </form>
        </div>
      ) : isForgetPass ? (
        <div>
          <form onSubmit={handleEmailSubmit}>
            <FormInput
              type="resetmail"
              name="resetmail"
              value={resetMail}
              handleChange={handleChange}
              label="E mail"
              required
            />
            <CustomButton type="submit">Gönder</CustomButton>
          </form>
        </div>
      ) : (
        <div className="sign-in-sub-wrapper">
          <h2 className="title">Giriş Yap</h2>
          <div
            className="cizgi"
            style={{ background: "#00a2ff", width: "21%" }}
          ></div>
          <form onSubmit={handleSubmit}>
            <FormInput
              name="email"
              type="email"
              value={email}
              handleChange={handleChange}
              label="Email"
              required
            />
            <FormInput
              name="password"
              type="password"
              value={password}
              handleChange={handleChange}
              label="Şifre"
              required
            />
            {isPending ? (
              <CustomButton disabled type="submit">
                yükleniyor...
              </CustomButton>
            ) : (
              <CustomButton type="submit">GİRİŞ YAP</CustomButton>
            )}
            {error && (
              <p style={{ marginTop: "1rem", color: "red", fontSize: "16px" }}>
                {error.includes("auth") ? "email veya şifre yanlış" : error}
              </p>
            )}
          </form>
          <button
            onClick={() => setIsForgetPass(true)}
            className="forgot-password"
          >
            Şifremi unuttum
          </button>
        </div>
      )}
    </div>
  );
}
