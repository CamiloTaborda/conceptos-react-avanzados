import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Product from "./Components/Product";
import Home from "./Components/Home";
import About from "./Components/About";
import Dashboard from "./Components/Dashboard";
import Overview from "./Components/Overview";
import Settings from "./Components/Settings";
import Profile from "./Components/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import NotFound from "./Components/Notfound";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="settings" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Settings />
            </Suspense>
          } />
        </Route>
        <Route path="/profile" element={
          <ProtectedRoute isAuthenticated={false}>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
