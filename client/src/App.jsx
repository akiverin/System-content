import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";

function App() {
  return (
    <>
      <Sidebar />
      <main>
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
