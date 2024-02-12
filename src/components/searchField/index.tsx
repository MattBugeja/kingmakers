import React, { useEffect, useState } from "react";

type searchProps = {
  placeholder: string;
  performSearch: (searchTerm: string) => void;
  clearFilter: () => void;
};

const SearchComponent: React.FC<searchProps> = ({
  placeholder,
  performSearch,
  clearFilter
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    performSearch(searchTerm);

    if (searchTerm.length < 1) {
      clearFilter();
    }
  }, [searchTerm]);

  return (
    <div className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-gray-600">
      <input
        className="border-2 border-gray-300 bg-white h-10 w-full px-5 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        type="search"
        name="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        aria-label="Search"
      />
    </div>
  );
};

export default SearchComponent;
