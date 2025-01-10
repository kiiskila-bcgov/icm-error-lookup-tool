import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SystemMessage } from "../types";
import "@carbon/styles/css/styles.css";
import { Loading, InlineNotification, Grid, Row, Column } from "@carbon/react";

const MessageDetail = () => {
  const {
    query: { id },
  } = useRouter();
  const [message, setMessage] = useState<SystemMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessage = async (id: string | string[] | undefined) => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages?id=${id}`);
      if (!response.ok) throw new Error("Failed to fetch message details.");
      const { data } = await response.json();
      setMessage(data);
    } catch (error) {
      console.error("Error fetching message:", error);
      setError("Failed to fetch message details.");
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadMessage(id);
  }, [id]);

  return (
    <Grid style={{ padding: "2rem" }}>
      <Row>
        <Column>
          <h1>System Message Detail</h1>
          {loading && (
            <Loading description="Loading message..." withOverlay={false} />
          )}
          {error && (
            <InlineNotification
              kind="error"
              title="Error"
              subtitle={error}
              lowContrast
              style={{ marginBottom: "1rem" }}
            />
          )}
          {!loading && !error && message && (
            <div>
              {Object.entries(message).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong>{" "}
                  {value}
                </p>
              ))}
            </div>
          )}
          {!loading && !error && !message && <p>No message found.</p>}
        </Column>
      </Row>
    </Grid>
  );
};

export default MessageDetail;
