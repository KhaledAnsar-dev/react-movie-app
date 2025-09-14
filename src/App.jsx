import React, { useEffect, useState } from "react";
import Search from "./Component/Search.jsx";

const App = () => {
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper text-amber-50">
        <header>
          <img src="/hero.png" alt="hero-image" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Enjoy
            Without The Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>Al movies</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  );
};

export default App;
