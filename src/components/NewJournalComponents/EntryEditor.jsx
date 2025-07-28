import React, { useState, useEffect, useRef, useCallback } from "react";
import getMoodEmoji from "../../utils/moodUtils";
import getWeatherEmoji from "../../utils/getWeatherEmoji";

const EntryEditor = ({ entry, updateEntry, darkMode, settings }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [showTimeCapsule, setShowTimeCapsule] = useState(false);
  const [isEditorEmpty, setIsEditorEmpty] = useState(!entry.content);
  const editorRef = useRef(null);
  const autoSaveRef = useRef(null);

  // Auto-save functionality
  const autoSave = useCallback(() => {
    if (autoSaveRef.current) {
      clearTimeout(autoSaveRef.current);
    }
    autoSaveRef.current = setTimeout(() => {
      updateEntry(entry);
    }, 1000);
  }, [entry, updateEntry]);

  useEffect(() => {
    autoSave();
    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
    };
  }, [entry.content, entry.title, autoSave]);

  const handleTitleChange = (e) => {
    updateEntry({ ...entry, title: e.target.value });
  };

  const handleContentInput = (e) => {
    const text = e.currentTarget.textContent || "";
    setIsEditorEmpty(text.trim() === "");
    updateEntry({ ...entry, content: text });
  };

  const handleMoodChange = (mood) => {
    updateEntry({ ...entry, mood });
  };

  const handleWeatherChange = (weather) => {
    updateEntry({ ...entry, weather });
  };

  const addTag = () => {
    if (newTag.trim() && !entry.tags.includes(newTag.trim())) {
      updateEntry({ ...entry, tags: [...entry.tags, newTag.trim()] });
      setNewTag("");
      setShowTagInput(false);
    }
  };

  const removeTag = (tagToRemove) => {
    updateEntry({
      ...entry,
      tags: entry.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        updateEntry({
          ...entry,
          images: [
            ...entry.images,
            { id: Date.now(), data: imageData, name: file.name },
          ],
        });
      };
      reader.readAsDataURL(file);
      e.target.value = null; // Reset input
    }
  };

  const removeImage = (imageId) => {
    updateEntry({
      ...entry,
      images: entry.images.filter((img) => img.id !== imageId),
    });
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    setShowToolbar(false);
  };

  const toggleTimeCapsule = () => {
    if (entry.isTimeCapsule) {
      updateEntry({ ...entry, isTimeCapsule: false, timeCapsuleDate: null });
    } else {
      setShowTimeCapsule(true);
    }
  };

  const setTimeCapsuleDate = (date) => {
    updateEntry({ ...entry, isTimeCapsule: true, timeCapsuleDate: date });
    setShowTimeCapsule(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Entry Header */}
      <div
        className={`mb-6 p-4 rounded-lg ${
          darkMode ? "bg-gray-800 bg-opacity-50" : "bg-white bg-opacity-70"
        } backdrop-blur-sm`}
      >
        <input
          type="text"
          placeholder="Entry title..."
          value={entry.title}
          onChange={handleTitleChange}
          className={`w-full text-2xl font-bold bg-transparent border-none outline-none placeholder-gray-400 ${
            darkMode ? "text-white" : "text-gray-800"
          } ${settings.font}`}
        />

        <div className="flex items-center justify-between mt-4">
          <div
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {formatDate(entry.date)}
            {entry.isTimeCapsule && entry.timeCapsuleDate && (
              <span className="ml-2 text-purple-500">
                🕰️ Time Capsule opens on{" "}
                {new Date(entry.timeCapsuleDate).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Mood Selector */}
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Mood:
              </span>
              {["happy", "sad", "neutral", "excited", "angry"].map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodChange(mood)}
                  className={`text-2xl p-1 rounded ${
                    entry.mood === mood ? "bg-blue-500 bg-opacity-20" : ""
                  }`}
                  title={mood}
                >
                  {getMoodEmoji(mood)}
                </button>
              ))}
            </div>

            {/* Weather Selector */}
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Weather:
              </span>
              {["sunny", "cloudy", "rainy", "snowy", "stormy"].map(
                (weather) => (
                  <button
                    key={weather}
                    onClick={() => handleWeatherChange(weather)}
                    className={`text-xl p-1 rounded ${
                      entry.weather === weather
                        ? "bg-blue-500 bg-opacity-20"
                        : ""
                    }`}
                    title={weather}
                  >
                    {getWeatherEmoji(weather)}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className={`mb-4 p-3 rounded-lg ${
          darkMode ? "bg-gray-800 bg-opacity-50" : "bg-white bg-opacity-70"
        } backdrop-blur-sm`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Format Buttons */}
            <button
              onClick={() => formatText("bold")}
              className={`p-2 rounded hover:bg-gray-200 hover:bg-opacity-20 transition-colors ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              title="Bold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 4v3h5.5a2 2 0 110 4H5v3h5.5a5 5 0 000-10H5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={() => formatText("italic")}
              className={`p-2 rounded hover:bg-gray-200 hover:bg-opacity-20 transition-colors ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              title="Italic"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 1a1 1 0 000 2h1.5L7.7 15H6a1 1 0 100 2h6a1 1 0 100-2h-1.5L12.3 3H14a1 1 0 100-2H8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={() => formatText("underline")}
              className={`p-2 rounded hover:bg-gray-200 hover:bg-opacity-20 transition-colors ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              title="Underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 18a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0-4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <button
              onClick={() => formatText("insertUnorderedList")}
              className={`p-2 rounded hover:bg-gray-200 hover:bg-opacity-20 transition-colors ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              title="Bullet List"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={() => formatText("insertOrderedList")}
              className={`p-2 rounded hover:bg-gray-200 hover:bg-opacity-20 transition-colors ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              title="Numbered List"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            <label
              className={`p-2 rounded hover:bg-gray-200 hover:bg-opacity-20 transition-colors cursor-pointer ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              title="Add Image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center space-x-2">
            {/* Time Capsule Button */}
            <button
              onClick={toggleTimeCapsule}
              className={`p-2 rounded hover:bg-gray-200 hover:bg-opacity-20 transition-colors ${
                entry.isTimeCapsule
                  ? "text-purple-500"
                  : darkMode
                  ? "text-white"
                  : "text-gray-700"
              }`}
              title="Time Capsule"
            >
              🕰️
            </button>

            {/* Tags Button */}
            <button
              onClick={() => setShowTagInput(!showTagInput)}
              className={`p-2 rounded hover:bg-gray-200 hover:bg-opacity-20 transition-colors ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              title="Add Tags"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tag Input */}
        {showTagInput && (
          <div className="mt-3 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add a tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              className={`flex-1 px-3 py-2 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <button
              onClick={addTag}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              Add
            </button>
          </div>
        )}

        {/* Display Tags */}
        {entry.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.tags.map((tag, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Time Capsule Modal */}
      {showTimeCapsule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg max-w-md w-full mx-4 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Create Time Capsule
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Choose when this entry should be "opened" and highlighted in your
              journal.
            </p>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setTimeCapsuleDate(e.target.value)}
              className={`w-full p-3 rounded border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowTimeCapsule(false)}
                className={`flex-1 py-2 px-4 rounded transition-colors ${
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

      {/* Images Display */}
      {entry.images.length > 0 && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            darkMode ? "bg-gray-800 bg-opacity-50" : "bg-white bg-opacity-70"
          } backdrop-blur-sm`}
        >
          <h4
            className={`font-medium mb-3 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Images
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {entry.images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.data}
                  alt={image.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Editor */}
      <div
        className={`rounded-lg relative ${
          darkMode ? "bg-gray-800 bg-opacity-50" : "bg-white bg-opacity-70"
        } backdrop-blur-sm min-h-96`}
      >
        <div
          ref={editorRef}
          contentEditable
          onInput={handleContentInput}
          className={`w-full p-6 rounded-lg outline-none ${settings.font} ${
            settings.fontSize
          } leading-relaxed ${darkMode ? "text-white" : "text-gray-800"} ${
            isEditorEmpty ? "empty-editor" : ""
          }`}
          style={{ minHeight: "400px" }}
          data-placeholder="Start writing your thoughts..."
        />
        
        {/* CSS-based placeholder */}
        <style jsx>{`
          .empty-editor:before {
            content: attr(data-placeholder);
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            color: ${darkMode ? "#9CA3AF" : "#6B7280"};
            pointer-events: none;
          }
        `}</style>
      </div>

      {/* Auto-save indicator */}
      <div
        className={`mt-4 text-center text-sm ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Auto-saved ✓
      </div>
    </div>
  );
};

export default EntryEditor;