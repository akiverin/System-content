import React, { useState } from "react";
import Input from "../Input";
import "./Search.scss";

const Search = ({ onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search__button">
        Поиск
      </button>
    </form>
  );
};

export default Search;
