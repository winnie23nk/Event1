import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import EventList from "./components/EventList";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/events" />
              ) : (
                <LoginSignup onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/events"
            element={
              isAuthenticated ? (
                <EventList onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/events" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
