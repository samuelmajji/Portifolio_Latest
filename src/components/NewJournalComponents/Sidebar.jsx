import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import getMoodEmoji from "../../utils/moodUtils";


// Sidebar Component
const Sidebar = ({
  entries,
  currentEntry,
  setCurrentEntry,
  showSidebar,
  darkMode,
  deleteEntry,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = (entryId, e) => {
    e.stopPropagation();
    setShowDeleteConfirm(entryId);
  };

  const confirmDelete = (entryId) => {
    deleteEntry(entryId);
    setShowDeleteConfirm(null);
  };

  if (!showSidebar) return null;

  return (
    <aside
      className={`fixed left-0 top-20 bottom-0 w-80 ${
        darkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-white bg-opacity-95 border-gray-200"
      } border-r backdrop-blur-sm overflow-y-auto`}
    >
      <div className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          <svg
            className={`absolute left-3 top-2.5 w-5 h-5 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Entry List */}
        <div className="space-y-2">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => setCurrentEntry(entry)}
              className={`p-3 rounded-lg cursor-pointer transition-all relative group ${
                currentEntry?.id === entry.id
                  ? "bg-blue-100 border-blue-500 border-2"
                  : darkMode
                  ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`font-medium truncate flex-1 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {entry.title || "Untitled Entry"}
                </h3>
                <button
                  onClick={(e) => handleDelete(entry.id, e)}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
                    darkMode
                      ? "text-gray-400 hover:text-red-400"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <p
                className={`text-sm mb-2 line-clamp-2 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {entry.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
              </p>

              <div className="flex items-center justify-between text-xs">
                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  {formatDate(entry.date)}
                </span>
                <div className="flex items-center space-x-1">
                  {entry.isTimeCapsule && (
                    <span className="text-purple-500" title="Time Capsule">
                      🕰️
                    </span>
                  )}
                  {entry.images.length > 0 && (
                    <span className="text-green-500" title="Has Images">
                      📷
                    </span>
                  )}
                  <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                </div>
              </div>

              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {entry.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${
                        darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredEntries.length === 0 && (
            <div
              className={`text-center py-8 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {searchTerm ? "No entries found" : "No entries yet"}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg max-w-sm w-full mx-4 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Delete Entry?
            </h3>
            <p
              className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              This action cannot be undone. Are you sure you want to delete this
              entry?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => confirmDelete(showDeleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
export default Sidebar;