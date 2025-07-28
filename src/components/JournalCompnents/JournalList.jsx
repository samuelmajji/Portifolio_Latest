import React from "react";
import {
  FaHome,
  FaSearch,
  FaCog,
  FaCloudUploadAlt,
  FaPlus,
  FaEyeSlash,
} from "react-icons/fa";
import { journals } from "/Users/samuelmajji/Desktop/Projects/Portifolio_main/src/components/data/Dairy.js";

const JournalList = ({ journalName, setPage }) => {
  const journal = journals.find((j) => j.name === journalName);

  if (!journal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-red-500">
        Journal not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top Red Bar */}
      <div className="bg-red-600 text-white flex items-center justify-between px-6 py-2">
        <div className="flex items-center space-x-2">
          <FaHome onClick={() => setPage("home")} />
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-red-500 rounded-full pl-10 pr-4 py-1 placeholder-white text-white"
            />
            <FaSearch className="absolute left-3 top-1.5 text-white text-sm" />
          </div>
        </div>

        <div className="font-serif text-2xl">penzu</div>

        <div className="flex items-center space-x-6">
          <button className="bg-white text-red-600 px-4 py-1 rounded text-sm font-semibold">
            Go PRO
          </button>
          <span>Samuel ▼</span>
        </div>
      </div>

      {/* Journal Header */}
      <div className="bg-gray-100 py-5 border-b border-gray-300 px-64">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{journal.name}</h1>
            <p className="text-sm text-gray-600">
              {journal.entries.length} total entries | Created on{" "}
              {new Date(journal.time).toDateString()}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaCog className="text-gray-600" />
            <FaCloudUploadAlt className="text-gray-600" />
            <button
              onClick={() => setPage("JournalEntry")}
              className="bg-blue-600 text-white px-4 py-1 rounded text-sm font-medium flex items-center"
            >
              <FaPlus className="mr-1" /> New Entry
            </button>
          </div>
        </div>

        {/* Filter + Search Row */}
        <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
          <div className="flex flex-wrap gap-3">
            <select className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm">
              <option>Select...</option>
            </select>
            <select className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm">
              <option>All Time</option>
            </select>
            <select className="border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm">
              <option>Active Entries</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search this journal"
              className="border border-gray-300 px-4 py-2 rounded-md text-sm w-64 shadow-sm"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-400 text-sm" />
          </div>
        </div>
      </div>

      {/* Entries Table */}
      <div className="px-64 py-4">
        <div className="border-t border-gray-300">
          <div className="grid grid-cols-12 text-sm font-semibold text-gray-600 py-2 border-b border-gray-300">
            <div className="col-span-1 pl-2"> </div>
            <div className="col-span-6">Entry</div>
            <div className="col-span-3">Date Created</div>
            <div className="col-span-2">Shared</div>
          </div>

          {/* Journal Entries Rendered */}
          {journal.entries.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-12 items-center text-sm py-3 hover:bg-gray-50 border-b"
            >
              <div className="col-span-1 pl-2">
                <input type="checkbox" />
              </div>
              <div className="col-span-6">
                <p className="font-semibold text-gray-800">{entry.title}</p>
                <p className="text-gray-500 text-sm line-clamp-1">
                  {entry.description}
                </p>
              </div>
              <div className="col-span-3 text-gray-500">
                {new Date(entry.timestamp).toLocaleString()}
              </div>
              <div className="col-span-2 text-gray-400">
                <FaEyeSlash />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalList;
