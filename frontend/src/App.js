import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages WITHOUT Navbar */}
        <Route path="/" element={<Login />} />

        {/* Pages WITH Navbar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/interview/:id"
          element={
            <Layout>
              <Interview />
            </Layout>
          }
        />

        <Route
          path="/result"
          element={
            <Layout>
              <Result />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;