import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";
import Info from "./pages/Info";
import ProjectDetail from "./pages/ProjectDetail";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <div className="bg-ink min-h-screen flex flex-col">
        <Preloader onDone={() => setLoaded(true)} />
        <div
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
          className="flex flex-col min-h-screen"
        >
          <Header />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
