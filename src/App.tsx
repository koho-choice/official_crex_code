import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { HowItWorks } from "./pages/HowItWorks";
import { Demo } from "./pages/Demo";
import UploadPage from "./pages/UploadPage";
import { EssayDemo } from "./pages/EssayDemo";
import { LogoPage } from "./pages/LogoPage";
import { AcceptData } from "./pages/AcceptData";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup.js";
import { AuthProvider } from "./contexts/index.js";
import PrivateRoutes from "./components/routes/PrivateRoutes.js";
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          {/* Private Routes */}

          <Routes>
            {/* Private Routes */}
            <Route path="/*" element={<PrivateRoutes />} />
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
            <Route
              path="/demo"
              element={
                <>
                  <Navbar />
                  <Demo />
                </>
              }
            />

            <Route
              path="/how-it-works"
              element={
                <>
                  <Navbar />
                  <HowItWorks />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  <About />
                </>
              }
            />
            <Route path="/testdem" element={<EssayDemo />} />
            <Route path="/logo" element={<LogoPage />} />
            <Route
              path="/accept-data"
              element={
                <>
                  <Navbar />
                  <AcceptData />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
