import React from "react";
import { logo } from "../assets/index";
const Hero = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center ">
      <nav className="w-full flex justify-between items-center p-2 mb-10">
        <img src={logo} className="w-32 object-contain" alt="Sumza_logo" />
        <button
          className="black_btn font-semibold"
          type="button"
          onClick={() => window.open("404")}
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Your Articles with <br className="max-md:hidden" />
        The Power of <span className="orange_gradient"> GPT-4 AI</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with{" "}
        <span className="orange_gradient">Sumza</span>, an open source article
        summarizer that transforms lengthy articles intoclear and concise
        summaries...
      </h2>
    </header>
  );
};

export default Hero;
