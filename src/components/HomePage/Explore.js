  import React, { useState } from "react";
  import FilterCard from "../UI/FilterCard";
  import Modal from "../UI/Modal";

  function Explore() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({
      status: [],
      level: [],
    });

    const [dropdownValue, setDropdownValue] = useState(""); // State to manage dropdown value

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const handleDropdownChange = (event) => {
      const [type, value] = event.target.value.split("-");
      if (!value || selectedFilters[type].includes(value)) return;

      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [type]: [...prevFilters[type], value],
      }));

      localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
      
      setDropdownValue(""); // Reset the dropdown value after selecting an option
    };

    const handleRemoveFilter = (type, value) => {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [type]: prevFilters[type].filter((filter) => filter !== value),
      }));
    };

    return (
      <div className="p-6 bg-[rgba(0,42,59,1)]">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Explore Challenges
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 mt-[5%]">
          {/* Search Form */}
          <form className="w-full lg:w-[60%] max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-4">
            <div className="relative flex-grow">
              <label
                htmlFor="default-search"
                className="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Combined Filter Dropdown */}
                
            <div className="relative flex-shrink-0">
              <select
                value={dropdownValue}
                onChange={handleDropdownChange}
                className="block w-[60%] max-w-xs p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Filter</option>
                <optgroup label="Status">
                  <option value="status-All">Status: All</option>
                  <option value="status-Active">Status: Active</option>
                  <option value="status-Upcoming">Status: Upcoming</option>
                  <option value="status-Past">Status: Past</option>
                </optgroup>
                <optgroup label="Level">
                  <option value="level-Easy">Level: Easy</option>
                  <option value="level-Medium">Level: Medium</option>
                  <option value="level-Hard">Level: Hard</option>
                </optgroup>
              </select>
            </div>
          </form>

          {/* Display Selected Filters as FilterCard */}
          <div className="mt-10 flex flex-wrap gap-6 w-full justify-center lg:justify-center">
            {selectedFilters.status.map((status) => (
              <FilterCard
                key={status}
                title={`Status: ${status}`}
                onRemove={() => handleRemoveFilter("status", status)}
              />
            ))}
            {selectedFilters.level.map((level) => (
              <FilterCard
                key={level}
                title={`Level: ${level}`}
                onRemove={() => handleRemoveFilter("level", level)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default Explore;
