import { useState } from "react";

import ".././App.css";
import SearchBar from ".././components/SearchBar";
import Navbar from "../components/Navbar";

function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar />
      <SearchBar search={search} setSearch={setSearch} />
    </>
  );
}

export default HomePage;
