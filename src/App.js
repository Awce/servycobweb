import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import AppRouter from "./routes/Router";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
