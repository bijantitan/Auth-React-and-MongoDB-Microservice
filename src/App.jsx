import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/login/Login.jsx";
import Register from "./components/login/Register.jsx";

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
