const WelcomeScreen = ({ createNewEntry, darkMode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`text-center p-8 rounded-lg ${
          darkMode ? "bg-gray-800 bg-opacity-50" : "bg-white bg-opacity-70"
        } backdrop-blur-sm max-w-md`}
      >
        <div className="text-6xl mb-6">📝</div>
        <h2
          className={`text-2xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Welcome to Daily Journal
        </h2>
        <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Start documenting your thoughts, memories, and experiences. Create
          your first entry to begin your journaling journey.
        </p>
        <button
          onClick={createNewEntry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Create Your First Entry</span>
        </button>
      </div>
    </div>
  );
};
export default WelcomeScreen;