import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthToken from "./services/AuthToken";



function App() {

  useEffect(() => {
    const authToken = new AuthToken();
    authToken.checkRememberTokenExpiration();
   })
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
