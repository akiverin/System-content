import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";
import Sidebar from "@/components/Sidebar/";

function App() {
  return (
    <>
      <main>
        <Sidebar />
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
