import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignup = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccessMessage("");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        onLogin();
        navigate("/events");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        "Login error: " + (error.response?.data.message || error.message)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      handleLogin();
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/register",
          { name, username, email, password },
          { withCredentials: true }
        );

        if (response.data.success) {
          setSuccessMessage("Signup successful! Please log in.");
          setIsLogin(true);
          setError("");
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError(
          "Signup error: " + (error.response?.data.message || error.message)
        );
      }
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "2px solid black",
      borderRadius: "5px",
      margin: "2px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
    success: {
      color: "green",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        )}
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Signup"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}
      </form>
      <button onClick={handleToggle} style={styles.button}>
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
    </div>
  );
};

export default LoginSignup;
