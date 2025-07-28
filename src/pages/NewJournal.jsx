import React from 'react';
const { useState, useEffect, useRef, useCallback } = React;
import Header from "../components/NewJournalComponents/Header";
import SettingsPanel from "../components/NewJournalComponents/SettingsPanal";
import Sidebar from "../components/NewJournalComponents/Sidebar";
import EntryEditor from "../components/NewJournalComponents/EntryEditor";
import WelcomeScreen from "../components/NewJournalComponents/WelcomeScreen";


// Main App Component
const JournalApp = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    background:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    font: "font-serif",
    fontSize: "text-base",
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journal-entries");
    const savedSettings = localStorage.getItem("journal-settings");
    const savedDarkMode = localStorage.getItem("journal-darkmode");

    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  // Auto-save entries
  useEffect(() => {
    localStorage.setItem("journal-entries", JSON.stringify(entries));
  }, [entries]);

  // Save settings
  useEffect(() => {
    localStorage.setItem("journal-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("journal-darkmode", JSON.stringify(darkMode));
  }, [darkMode]);

  const createNewEntry = () => {
    const newEntry = {
      id: Date.now(),
      title: "",
      content: "",
      date: new Date().toISOString(),
      mood: "neutral",
      weather: "sunny",
      tags: [],
      images: [],
      isTimeCapsule: false,
      timeCapsuleDate: null,
    };
    setEntries((prev) => [newEntry, ...prev]);
    setCurrentEntry(newEntry);
  };

  const updateEntry = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
    setCurrentEntry(updatedEntry);
  };

  const deleteEntry = (entryId) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
    if (currentEntry?.id === entryId) {
      setCurrentEntry(null);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        className="min-h-screen bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: `url(${settings.background})` }}
      >
        <div
          className={`min-h-screen ${
            darkMode ? "bg-black bg-opacity-70" : "bg-white bg-opacity-30"
          } backdrop-blur-sm`}
        >
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            createNewEntry={createNewEntry}
            settings={settings}
            setSettings={setSettings}
          />

          <div className="flex">
            <Sidebar
              entries={entries}
              currentEntry={currentEntry}
              setCurrentEntry={setCurrentEntry}
              showSidebar={showSidebar}
              darkMode={darkMode}
              deleteEntry={deleteEntry}
            />

            <main
              className={`flex-1 transition-all duration-300 ${
                showSidebar ? "ml-80" : "ml-0"
              }`}
            >
              {currentEntry ? (
                <EntryEditor
                  entry={currentEntry}
                  updateEntry={updateEntry}
                  darkMode={darkMode}
                  settings={settings}
                />
              ) : (
                <WelcomeScreen
                  createNewEntry={createNewEntry}
                  darkMode={darkMode}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};


export default JournalApp;
