import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Service } from "../types/service";
import { formatDate } from "../utils/format";

interface SearchHistoryProps {
  data?: Service.Weather[] | null;
  onSearch: (city: string) => void;
  onDelete: (index: number) => void;
}

const SearchHistoryCard: React.FC<SearchHistoryProps> = ({
  data,
  onSearch,
  onDelete,
}) => {
  const [removing, setRemoving] = useState<number>(-1);
  const buttonClassName =
    "btn btn-sm btn-circle dark:btn-outline bg-white text-gray-500 shadow-md hover:shadow-lg transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-300";
  const handleDelete = (index: number) => {
    // Set the item as being removed
    setRemoving(index);
    // Wait for the animation to finish before removing the item
    setTimeout(() => {
      onDelete(index);
      setRemoving(-1);
    }, 300); // This should match the duration of your animation
  };
  if (!data || data.length === 0) {
    return (
      <div className="card card-body p-5 px-7 rounded-[2rem] bg-white/25 dark:bg-black/25 shadow overflow-hidden text-sm">
        <p className="font-medium dark:text-white">Search Result</p>
        <div>No history available.</div>
      </div>
    );
  }
  return (
    <div className="card card-body p-5 px-7 rounded-[2rem] bg-white/25 dark:bg-black/25 shadow overflow-hidden text-sm">
      <p className="font-medium dark:text-white">Search Result</p>
      <ul className="">
        {data?.map((item, index) => (
          <li key={index} className="p-1.5 ">
            <div
              className={`rounded-[1rem] shadow bg-white/50 dark:bg-black/25  px-5 py-3 flex items-center sm:px-6 transition ease-out duration-300 transform${
                removing === index ? "opacity-0 scale-95" : ""
              }`}
            >
              <div className="flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <div className=" leading-5 font-medium dark:text-white">
                    {item.name}, {item.sys.country}
                  </div>
                </div>
                <div className="mt-1 text-xs sm:mt-0 sm:text-md">
                  {formatDate(item.createdAt)}
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => onSearch(item.name)}
                  className={buttonClassName}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => handleDelete(index)}
                  className={buttonClassName}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistoryCard;
