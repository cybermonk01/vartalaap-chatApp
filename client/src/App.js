import "./App.css";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "./Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <ChakraProvider>
          <Router>
            <Routes>
              <Route path="/" element={<ChatPage />} exact />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </ChakraProvider>
      </ChatProvider>
    </div>
  );
}

export default App;
