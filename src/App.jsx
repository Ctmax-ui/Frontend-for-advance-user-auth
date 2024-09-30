import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import CreateUserPage from "./components/pages/CreateUserPage";
import UserProfile from "./components/pages/UserProfile";
import NotFoundPage from "./components/pages/NotFoundPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createaccount" element={<CreateUserPage />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
