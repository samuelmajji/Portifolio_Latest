import {
  FaSearch,
  FaPaintBrush,
  FaBars,
  FaCog,
  FaLock,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import journalBg from "/Users/samuelmajji/Desktop/Projects/Portifolio_main/src/assets/Journal_bgs/JournalBG.png";

const MiniJournalCard = ({ title, onClick }) => (
  <div
    onClick={() => onClick(title)}
    className="cursor-pointer flex w-[250px] h-[310px] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
  >
    {/* Left spine */}
    <div className="w-8 bg-gray-800"></div>

    {/* Right book cover */}
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 flex-1 flex items-center justify-center text-white font-semibold text-md rounded-r-lg">
      {title}
    </div>
  </div>
);

const DairyHero = ({ setPage, setJournalName }) => {
  const [journal, setJournal] = useState(null); // null means all journals view

  const handleOpenJournal = (title) => {
    setJournal(title);
    setJournalName(title); // pass journal name to following pages
  };

  const handleBack = () => {
    setJournal(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${journalBg})` }}
    >
      {/* Top Navigation Bar */}
      <nav className="bg-red-500 text-white p-3 flex justify-between items-center">
        <div className="bg-red-400 text-white pl-3 p-1 rounded-full flex items-center min-w-48 ml-5">
          <FaSearch className="mr-1" /> Search
        </div>
      </nav>

      {/* Centered Journal Info and Actions */}
      <div className="bg-black text-gray-400 p-3 text-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {!journal ? (
            <div className="text-white text-lg font-semibold">
              Select a Journal
            </div>
          ) : (
            <button
              onClick={handleBack}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center space-x-2"
            >
              <FaArrowLeft />
              <span>Back to All Journals</span>
            </button>
          )}

          {/* Buttons */}
          <div className="flex items-center space-x-2">
            <button className="bg-gray-600 p-2 rounded">
              <FaPaintBrush />
            </button>

            <Link
              to="/Journal"
              className="bg-red-600 text-white px-4 py-2 rounded flex items-center space-x-1"
            >
              <FaPlus />
              <span>New Journal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-full h-full flex justify-center mt-10">
        {!journal ? (
          // Show all journals
          <div className="flex flex-row items-start ml-10 gap-20">
            <MiniJournalCard title="Samuel's Journal" onClick={handleOpenJournal} />
            <MiniJournalCard title="Notebook" onClick={handleOpenJournal} />
          </div>
        ) : (
          // Show single full journal
          <div className="rounded-lg overflow-hidden shadow-lg flex">
            {/* Left Spine */}
            <div className="w-10 bg-gray-800"></div>

            {/* Blue Book */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-[500px] h-[600px] rounded-r-lg shadow-lg flex flex-col justify-center">
              <div className="bg-white rounded-lg shadow text-center text-gray-800 text-2xl font-bold mx-auto w-4/5 h-1/5">
                <div className="flex justify-center items-center h-1/2">
                  <p>{journal}</p>
                </div>

                <div className="flex justify-center items-center pt-2 space-x-4 border-t-2 border-gray-400">
                  <div className="flex items-center space-x-2 border-r-2 pr-4">
                    <div
                      onClick={() => setPage("JournalEntry")}
                      className="bg-gray-200 px-4 py-2 rounded shadow flex items-center space-x-1 text-sm cursor-pointer"
                    >
                      <FaPaintBrush />
                      <span>New Entry</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 border-r-2 pr-4">
                    <div
                      onClick={() => setPage("JournalList")}
                      className="text-black text-xl cursor-pointer"
                    >
                      <FaBars />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 border-r-2 pr-4">
                    <button className="text-black text-xl">
                      <FaCog />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 border-r-2 pr-4">
                    <button className="text-black text-xl">
                      <FaLock />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DairyHero;