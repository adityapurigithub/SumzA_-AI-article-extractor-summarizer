import { useState } from "react";
import Hero from "./component/Hero";
import Demo from "./component/Demo";

import "./App.css";

function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
}

export default App;
