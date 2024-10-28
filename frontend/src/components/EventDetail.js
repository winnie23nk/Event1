import React, { useEffect, useState } from "react";
import axios from "axios";

const EventDetail = ({ eventId, onClose }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/event/getEventById/${eventId}`,
          { withCredentials: true }
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h2>{event.title}</h2>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      <p>
        <strong>Date:</strong> {event.month} {event.year}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      )}
      <button
        onClick={onClose}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default EventDetail;
