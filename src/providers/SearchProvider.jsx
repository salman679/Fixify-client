import { useState } from "react";
import PropTypes from "prop-types";
import { SearchContext } from "../contexts/SearchContext";

export default function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  console.log(searchTerm);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node,
};
