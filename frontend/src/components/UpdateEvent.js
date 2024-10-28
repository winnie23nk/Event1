import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateEvent = ({ event, onUpdateComplete }) => {
  const [updatedEvent, setUpdatedEvent] = useState(event);

  useEffect(() => {
    setUpdatedEvent(event);
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/event/updateEvent/${event._id}`,
        updatedEvent,
        { withCredentials: true }
      );
      onUpdateComplete();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const styles = {
    form: {
      padding: "20px",
      maxWidth: "500px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      resize: "vertical",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div>
        <label style={styles.label}>
          Image URL:
          <input
            type="text"
            name="image"
            value={updatedEvent.image}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </label>
      </div>
      <div>
        <label style={styles.label}>
          Title:
          <input
            type="text"
            name="title"
            value={updatedEvent.title}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </label>
      </div>
      <div>
        <label style={styles.label}>
          Description:
          <textarea
            name="description"
            value={updatedEvent.description}
            onChange={handleInputChange}
            required
            style={styles.textarea}
          />
        </label>
      </div>
      <div>
        <label style={styles.label}>
          Month:
          <input
            type="text"
            name="month"
            value={updatedEvent.month}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </label>
      </div>
      <div>
        <label style={styles.label}>
          Year:
          <input
            type="text"
            name="year"
            value={updatedEvent.year}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </label>
      </div>
      <div>
        <label style={styles.label}>
          Location:
          <input
            type="text"
            name="location"
            value={updatedEvent.location}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </label>
      </div>
      <button type="submit" style={styles.button}>
        Update Event
      </button>
    </form>
  );
};

export default UpdateEvent;
