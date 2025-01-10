import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { SystemMessage } from "../types";

const useMessages = (errorCode: string) => {
  const [messages, setMessages] = useState<SystemMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages?errorCode=${errorCode}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, [errorCode]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return { messages, loading, error, loadMessages };
};

const Home = () => {
  const [errorCode, setErrorCode] = useState<string>("");
  const { messages, loading, error, loadMessages } = useMessages(errorCode);
  const router = useRouter();

  return (
    <div>
      <h1>System Messages</h1>
      <input
        type="text"
        placeholder="Filter by error code"
        value={errorCode}
        onChange={(e) => setErrorCode(e.target.value)}
      />
      <button onClick={loadMessages}>Load Messages</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ol>
          {messages.map((message) => (
            <li
              key={message.id}
              onClick={() => router.push(`/${message.id}`)}
              style={{ cursor: "pointer", padding: "5px 0" }}
            >
              <strong>{message.error_code}</strong> - {message.error_message}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Home;
