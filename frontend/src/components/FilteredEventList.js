import React from "react";

const FilteredEventList = ({ events, query, onView, onUpdate, onDelete }) => {
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  const styles = {
    list: {
      listStyleType: "none",
      padding: 0,
    },
    listItem: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      marginBottom: "10px",
      borderRadius: "4px",
      backgroundColor: "#fff",
    },
    eventTitle: {
      fontSize: "1.5em",
      margin: "0",
    },
    eventDescription: {
      margin: "5px 0",
      color: "#555",
    },
    eventDetails: {
      margin: "5px 0",
      fontStyle: "italic",
    },
    button: {
      margin: "5px",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
    },
  };

  return (
    <ul style={styles.list}>
      {filteredEvents.map((event) => (
        <li key={event._id} style={styles.listItem}>
          <h3 style={styles.eventTitle}>{event.title}</h3>
          <p style={styles.eventDescription}>{event.description}</p>
          <p style={styles.eventDetails}>
            {event.month} {event.year} - {event.location}
          </p>
          <button style={styles.button} onClick={() => onView(event._id)}>
            View
          </button>
          <button style={styles.button} onClick={() => onUpdate(event)}>
            Update
          </button>
          <button style={styles.button} onClick={() => onDelete(event._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FilteredEventList;
