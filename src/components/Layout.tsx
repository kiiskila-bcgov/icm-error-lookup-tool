import React, { ReactNode } from "react";
import { Container } from "@mui/material";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <div
        style={{
          height: "25%",
          backgroundColor: "#e2f1fb",
          margin: "15px 20px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          borderRadius: 5,
        }}
      >
        <div
          style={{
            height: "4px",
            backgroundColor: "#ffb035",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            borderRadius: "5px 5px 0 0",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "10% 2rem",
          height: "100%",
          minHeight: "100%",
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {children}
        </Container>
      </div>
    </div>
  );
};

export default Layout;
