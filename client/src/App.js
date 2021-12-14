import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/signup"
              element={user ? <Navigate replace to="/" /> : <Signup />}
            />
            <Route
              path="/signin"
              element={user ? <Navigate replace to="/" /> : <Signin />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
