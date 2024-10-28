import React, { useState } from "react";
import axios from "axios";

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = { title, description, month, year, location, image };
      await axios.post(
        "http://localhost:5000/api/event/createEvent",
        newEvent,
        {
          withCredentials: true,
        }
      );
      onEventCreated();
      setTitle("");
      setDescription("");
      setMonth("");
      setYear("");
      setLocation("");
      setImage("");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    textarea: {
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px",
      resize: "vertical",
    },
    button: {
      padding: "10px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={styles.input}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={styles.textarea}
      />
      <input
        type="text"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;
