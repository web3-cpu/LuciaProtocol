import * as React from "react";

export const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 p-2 rounded-md bg-gray-100">
      {/* Calendar Icon */}
      <button className="flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-300">
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.09375 9.90421H20.9177"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.4429 13.8097H16.4522"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0054 13.8097H12.0147"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.56013 13.8097H7.56939"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.4429 17.6962H16.4522"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0054 17.6962H12.0147"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.56013 17.6962H7.56939"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.0413 2.5V5.79078"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.9632 2.5V5.79078"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.2383 4.0791H7.77096C4.83427 4.0791 3 5.71504 3 8.72213V17.7718C3 20.8261 4.83427 22.4999 7.77096 22.4999H16.229C19.175 22.4999 21 20.8545 21 17.8474V8.72213C21.0092 5.71504 19.1842 4.0791 16.2383 4.0791Z"
            stroke="#130F26"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {/* Filter Icon */}
      <button className="flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-300">
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.65811 20.2806L9.97433 21.2293H9.97433L9.65811 20.2806ZM14.6581 18.614L14.9743 19.5627L14.9743 19.5626L14.6581 18.614ZM19.7071 7.79289L20.4142 8.5L19.7071 7.79289ZM15.2929 12.2071L14.5858 11.5L15.2929 12.2071ZM5 5.5H19V3.5H5V5.5ZM5 7.08579V5.5H3V7.08579H5ZM9.41421 11.5L5 7.08579L3.58579 8.5L7.99999 12.9142L9.41421 11.5ZM7.99999 12.9142V19.8063H9.99999V12.9142H7.99999ZM7.99999 19.8063C7.99999 20.8301 9.00304 21.5531 9.97433 21.2293L9.34188 19.332C9.66565 19.224 9.99999 19.465 9.99999 19.8063H7.99999ZM9.97433 21.2293L14.9743 19.5627L14.3419 17.6653L9.34188 19.332L9.97433 21.2293ZM14.9743 19.5626C15.5868 19.3585 16 18.7853 16 18.1396H14C14 17.9244 14.1377 17.7333 14.3419 17.6653L14.9743 19.5626ZM16 18.1396V12.9142H14V18.1396H16ZM19 7.08579L14.5858 11.5L16 12.9142L20.4142 8.5L19 7.08579ZM19 5.5V7.08579H21V5.5H19ZM20.4142 8.5C20.7893 8.12493 21 7.61622 21 7.08579H19L20.4142 8.5ZM16 12.9142V12.9142L14.5858 11.5C14.2107 11.8751 14 12.3838 14 12.9142H16ZM7.99999 12.9142H9.99999C9.99999 12.3838 9.78928 11.8751 9.41421 11.5L7.99999 12.9142ZM3 7.08579C3 7.61622 3.21071 8.12493 3.58579 8.5L5 7.08579V7.08579H3ZM19 5.5H21C21 4.39543 20.1046 3.5 19 3.5V5.5ZM5 3.5C3.89543 3.5 3 4.39543 3 5.5H5V5.5V3.5Z"
            fill="#222222"
          />
        </svg>
      </button>

      {/* Search Input */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="6" stroke="#222222" />
            <path
              d="M11 8C10.606 8 10.2159 8.0776 9.85195 8.22836C9.48797 8.37913 9.15726 8.6001 8.87868 8.87868C8.6001 9.15726 8.37913 9.48797 8.22836 9.85195C8.0776 10.2159 8 10.606 8 11"
              stroke="#222222"
              stroke-linecap="round"
            />
            <path d="M20 20L17 17" stroke="#222222" stroke-linecap="round" />
          </svg>
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F1A34D] focus:border-[#F1A34D]"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
