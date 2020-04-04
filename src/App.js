import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import AppRouter from "./routes/Router";
import UserState from "./context/user/UserState";

function App() {
  return (
    <UserState>
      <AppRouter />
    </UserState>
  );
}

export default App;
