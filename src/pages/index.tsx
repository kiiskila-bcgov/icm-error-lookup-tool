import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { SystemMessage } from "../types";
import "@carbon/styles/css/styles.css";
import {
  Button,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Search,
} from "@carbon/react";

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

  const headers = [
    { key: "error_code", header: "Error Code" },
    { key: "data_group", header: "Datagroup" },
    { key: "error_message", header: "Error Message" },
  ];

  const rows = messages.map((message) => ({
    id: message.id.toString(),
    error_code: message.error_code,
    data_group: message.data_group,
    error_message: message.error_message,
  }));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>System Messages</h1>
      <Search
        id="error-code-search"
        labelText="Filter by error code"
        placeholder="Enter error code"
        value={errorCode}
        onChange={(e) => setErrorCode(e.target.value)}
        style={{ marginBottom: "1rem", width: "50%" }}
      />
      <Button onClick={loadMessages}>Load Messages</Button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <DataTable rows={rows} headers={headers}>
          {({ rows, headers, getHeaderProps, getRowProps }) => (
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    {...getRowProps({ row })}
                    onClick={() => router.push(`/${row.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      )}
    </div>
  );
};

export default Home;
