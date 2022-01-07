import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import { Auth } from "./components/Auth/Auth";

const RedirectToPost = () => {
  return <Navigate to="/posts" replace />;
};

const RedirectAuthenticated = ({ user }) => {
  return !user ? <Auth /> : <Navigate to="/posts" replace />;
};

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<RedirectToPost />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<RedirectAuthenticated user={user} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
