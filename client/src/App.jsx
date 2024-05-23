import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import UserPage from "./components/UserPage";
import ConnectionsPage from "./components/ConnectionsPage";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ChatPage from "./components/ChatPage";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Header />
      <Routes element={ProtectedRoutes}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/connections" element={<ConnectionsPage />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
