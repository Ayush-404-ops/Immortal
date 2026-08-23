import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-void min-h-screen">
      <Preloader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <Nav />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
