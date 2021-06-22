import React from "react";
import { AuthProvider } from "context/AuthContext";
import { RouterApp } from "Router";
import { Button } from "components/Button";

// eslint-disable-next-line
const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <RouterApp />
      </AuthProvider>
    </div>
  );
};

export default App;
