import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SystemMessage } from "../types";

const MessageDetail = () => {
  const {
    query: { id },
  } = useRouter();
  const [message, setMessage] = useState<SystemMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const loadMessage = async (id: string | string[] | undefined) => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/messages?id=${id}`);
      if (!response.ok) throw new Error("Failed to fetch message details.");
      const { data } = await response.json();
      setMessage(data);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadMessage(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!message) return <p>No message found.</p>;

  return (
    <div>
      <h1>System Message Detail</h1>
      {Object.entries(message).map(([key, value]) => (
        <p key={key}>
          <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

export default MessageDetail;
