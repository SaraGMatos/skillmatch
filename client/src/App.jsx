import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import UserPage from "./components/UserPage";
import ConnectionsPage from "./components/ConnectionsPage";
import { useState } from "react";
import Footer from "./components/Footer";
import ChatPage from "./components/ChatPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/connections" element={<ConnectionsPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
