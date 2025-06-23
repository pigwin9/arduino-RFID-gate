"use client";
import { useState, useEffect } from "react";

function SSEClient() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:8080/statusTick");

    // Handle incoming messages
    eventSource.onmessage = (event) => {
      console.log("Received message:", event.data);
      setMessage(event.data); // Update state with the new message
    };

    // Handle errors
    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      setError("Connection failed");
      eventSource.close();
    };

    // Cleanup on unmount
    return () => {
      eventSource.close();
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <div>Last message: {message}</div>
    </div>
  );
}

export default SSEClient;
