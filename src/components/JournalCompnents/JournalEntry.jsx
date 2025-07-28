import React from "react";
import {
  FaLock,
  FaStar,
  FaLightbulb,
  FaHourglassHalf,
  FaTags,
  FaImage,
  FaBold,
  FaItalic,
  FaExpand,
  FaBook,
} from "react-icons/fa";
import { FiCalendar, FiSettings, FiStar, FiPlus } from "react-icons/fi";
import bgImage from "/Users/samuelmajji/Desktop/Projects/Portifolio_main/src/assets/Journal_bgs/JournalBG.png";
import { journals } from "/Users/samuelmajji/Desktop/Projects/Portifolio_main/src/components/data/Dairy.js";


const JournalApp = ({ setPage, JournalName }) => {
  const journal = journals.find((j) => j.name === JournalName);
  const [selectedEntry, setSelectedEntry] = React.useState(journal.entries[0]);

  if (!journal) {
    return (
      <div className="flex h-screen justify-center items-center text-2xl text-red-600 font-bold">
        Journal not found!
      </div>
    );
  }

  const handleTitleChange = (e) => {
    setSelectedEntry({ ...selectedEntry, title: e.target.value });
  };

  const handleDescChange = (e) => {
    setSelectedEntry({ ...selectedEntry, description: e.target.value });
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div
          onClick={() => setPage("home")}
          className="p-4 font-semibold text-lg border-b border-gray-700 cursor-pointer"
        >
          {journal.name}
        </div>

        <div className="p-3 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search journal..."
            className="flex-1 px-3 py-1 rounded bg-gray-700 text-sm focus:outline-none"
          />
          <FiSettings className="text-gray-400" />
        </div>

        <button className="bg-blue-600 mx-3 mb-3 py-2 rounded text-sm hover:bg-blue-500 transition flex items-center justify-center space-x-1">
          <FiPlus />
          <span>New Entry</span>
        </button>

        <div className="flex flex-col text-sm px-3 space-y-2">
          <button className="hover:bg-gray-700 px-2 py-2 rounded flex items-center space-x-2 border-b border-gray-700">
            <FaBook className="text-gray-300" />
            <span>View All Entries</span>
          </button>
          <button className="hover:bg-gray-700 px-2 py-2 rounded flex items-center space-x-2 border-b border-gray-700">
            <FiStar className="text-white" />
            <span>View Starred Entries</span>
          </button>
        </div>

        <div className="mt-4 border-t border-gray-700 px-3 text-sm overflow-y-auto">
          {journal.entries.map((entry, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedEntry(entry)}
              className={`py-2 px-2 cursor-pointer rounded border-b border-gray-700 ${
                selectedEntry === entry
                  ? "bg-gray-700 text-white font-semibold"
                  : "text-gray-300"
              }`}
            >
              <div className="flex justify-between">
                <span className="truncate max-w-[120px]">{entry.title}</span>
                <span className="text-xs">
                  {new Date(entry.timestamp).toLocaleDateString("en-US")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-red-500 text-white px-4 py-3 flex justify-between items-center">
          <a href="/dairy">
            <div className="font-bold text-xl">Me</div>
          </a>
        </div>

        <div
          className="p-6 flex-1 overflow-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto h-full space-y-4">
            {/* First Row */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center space-x-3 text-gray-600 text-xl">
                {selectedEntry.starred && <FaStar />}
                <FaLock />
                <input
                  type="text"
                  placeholder="Title"
                  value={selectedEntry.title}
                  onChange={handleTitleChange}
                  className="text-2xl font-semibold border-none focus:outline-none w-80 bg-transparent"
                />
              </div>
              <div className="text-sm text-green-600">
                ✓ Saved {Math.floor(Math.random() * 50)} minutes ago
              </div>
            </div>

            {/* Second Row */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center text-gray-600 space-x-2 text-sm">
                <FiCalendar className="text-lg" />
                <span>{new Date(selectedEntry.timestamp).toDateString()}</span>
              </div>
              <div className="flex space-x-4 text-xl text-gray-600">
                <FaLightbulb />
                <FaHourglassHalf />
                <FaTags />
                <FaImage />
                <FaBold />
                <FaItalic />
                <FaExpand />
              </div>
            </div>

            {/* Entry Area */}
            <textarea
              value={selectedEntry.description}
              onChange={handleDescChange}
              placeholder="Your entry here"
              className="w-full h-[400px] resize-none text-gray-700 text-lg focus:outline-none bg-transparent"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalApp;