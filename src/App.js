import React from "react";
import Entry from "./Entry";
function App() {
  return (
    <main>
      <section className="container">
        <div className="title">
          <h2>Pokédex</h2>
          <div className="underline"></div>
        </div>
        <Entry />
      </section>
    </main>
  );
}

export default App;
