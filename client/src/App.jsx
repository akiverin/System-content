import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.scss";
import Sidebar from "@/components/Sidebar/";

function App() {
  return (
    <>
      <main>
        <Sidebar />
        <div className="content">
          <AppRoutes />
        </div>
      </main>
    </>
  );
}

export default App;
