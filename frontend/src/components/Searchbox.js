import React, { useState } from "react";
import "../styles/Searchbox.css";

export default function SearchBox(props) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    props.history.push(`/search/name/${name}`);
  };

  return (
    <div className="header__searchContainer">
      <form onSubmit={handleSubmit}>
        <div className="header__search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search here.."
            onChange={(e) => setName(e.target.value)}
            className="header__searchInput"
            required
          />
          <button type="submit" className="header__searchIcon-button">
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
