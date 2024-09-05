import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function FilterCard(props) {
  return (
    <div className="flex">
      <div className="relative bg-[rgba(248,249,253,0.49)] p-3 rounded-3xl flex items-center">
        {/* Title */}
        <h1 className="text-white">{props.title}</h1>

        {/* Close Button */}
        <button
          type="button"
          onClick={props.onRemove} // Call the provided onRemove function when clicked
          className="text-gray-400 hover:text-gray-600 bg-white rounded-full ml-2"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default FilterCard;
