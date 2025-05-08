import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Router>
      <Navbar/>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
