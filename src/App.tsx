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

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
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
            path="/upload-page"
            element={
              <>
                <Navbar />
                <UploadPage />
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}
