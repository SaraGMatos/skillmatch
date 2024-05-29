import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import UserPage from "./components/UserPage";
import ConnectionsPage from "./components/ConnectionsPage";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Chat from "./components/Chat";
import LearningList from "./components/LearningList";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/learning" element={<LearningList />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
