import "./App.css";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ChatPage />} exact />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
