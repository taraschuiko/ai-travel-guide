import { useState } from "react";
import PropTypes from "prop-types";

const Header = ({ handleSearch }) => {
  const [place, setPlace] = useState("");

  return (
    <header>
      <div className="prose">
        <h1 className="mt-0 mb-6 font-bold text-gray-900">
          Your AI-Powered Travel Guide
        </h1>
      </div>
      <div className="flex">
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(place);
            }
          }}
          className="flex-grow px-4 py-2 mr-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 text-lg text-white bg-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => handleSearch(place)}
        >
          Explore your next destination
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Header;
