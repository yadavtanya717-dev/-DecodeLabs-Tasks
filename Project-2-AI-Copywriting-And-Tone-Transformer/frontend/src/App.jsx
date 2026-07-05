import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GeneratorForm from "./components/GeneratorForm";
import OutputCard from "./components/OutputCard";

function App() {
  const [generatedCopy, setGeneratedCopy] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setGeneratedCopy("");
  };

  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Hero />

        <section className="workspace" id="generator">
          <GeneratorForm
            setGeneratedCopy={setGeneratedCopy}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          <OutputCard
            generatedCopy={generatedCopy}
            isLoading={isLoading}
            onClear={handleClear}
          />
        </section>
      </main>
    </div>
  );
}

export default App;