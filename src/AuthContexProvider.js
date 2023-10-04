import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContex";

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [signupData, setSignupData] = useState("");
  const [signSuccess, setSignSuccess] = useState(false);

  const saveSignupData = (data) => {
    setSignupData(data);
    setSignSuccess(true);
    setToken(data.token);
    localStorage.setItem(
      "signupDeatils",
      JSON.stringify({
        signup: data,
      })
    );
  };
  const clearSignupData = () => {
    localStorage.removeItem("signupDeatils");
    setSignupData(null); // Clear the state as well
    setSignSuccess(false); // Reset signSuccess state
    setToken(null); // Reset token state
  };

  useEffect(() => {
    const user = localStorage.getItem("signupDeatils");
    if (user) {
      const parsedData = JSON.parse(user);
      if (parsedData) {
        setSignSuccess(true);
        setSignupData(parsedData.signup);
        setToken(parsedData.signup.token);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        signupData,
        signSuccess,
        saveSignupData,
        clearSignupData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
