import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateEvent from "./UpdateEvent";
import CreateEvent from "./CreateEvent";
import EventDetail from "./EventDetail";
import FilteredEventList from "./FilteredEventList";

const EventList = ({ onLogout }) => {
  const [events, setEvents] = useState([]);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);
  const [viewEventId, setViewEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/event/getEvents",
        { withCredentials: true }
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleCreateEventForm = () => {
    setIsCreatingEvent(!isCreatingEvent);
    setEventToUpdate(null);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/event/deleteEvent/${id}`, {
        withCredentials: true,
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateEvent = (event) => {
    setEventToUpdate(event);
  };

  const handleEventCreated = () => {
    setIsCreatingEvent(false);
    fetchEvents();
  };

  const handleViewEvent = (id) => {
    setViewEventId(id);
  };

  const closeEventDetail = () => {
    setViewEventId(null);
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      color: "#333",
    },
    button: {
      margin: "10px",
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    searchInput: {
      padding: "8px",
      marginBottom: "10px",
      width: "100%",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}></h1>

      {viewEventId ? (
        <EventDetail eventId={viewEventId} onClose={closeEventDetail} />
      ) : (
        <>
          <button style={styles.button} onClick={toggleCreateEventForm}>
            {isCreatingEvent ? "Cancel" : "Create Event"}
          </button>
          <button style={styles.button} onClick={onLogout}>
            Logout
          </button>

          {isCreatingEvent && (
            <CreateEvent
              onEventCreated={handleEventCreated}
              fetchEvents={fetchEvents}
            />
          )}

          {eventToUpdate && (
            <UpdateEvent
              event={eventToUpdate}
              onUpdateComplete={() => {
                setEventToUpdate(null);
                fetchEvents();
              }}
            />
          )}

          <input
            type="text"
            placeholder="Search events by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />

          <h2>Upcoming Events:</h2>
          {searchQuery ? (
            <FilteredEventList
              events={events}
              query={searchQuery}
              onView={handleViewEvent}
              onUpdate={handleUpdateEvent}
              onDelete={handleDeleteEvent}
            />
          ) : (
            <ul style={styles.list}>
              {events.map((event) => (
                <li key={event._id} style={styles.listItem}>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDetails}>
                    {event.month} {event.year} - {event.location}
                  </p>
                  <button
                    style={styles.button}
                    onClick={() => handleViewEvent(event._id)}
                  >
                    View
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => handleUpdateEvent(event)}
                  >
                    Update
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default EventList;
