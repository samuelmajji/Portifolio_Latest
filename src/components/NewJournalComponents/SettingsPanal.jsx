
// Settings Panel Component
const SettingsPanel = ({ settings, setSettings, darkMode, onClose }) => {
  const backgrounds = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  ];

  const fonts = [
    { name: "Serif", class: "font-serif" },
    { name: "Sans Serif", class: "font-sans" },
    { name: "Mono", class: "font-mono" },
  ];

  const fontSizes = [
    { name: "Small", class: "text-sm" },
    { name: "Medium", class: "text-base" },
    { name: "Large", class: "text-lg" },
    { name: "Extra Large", class: "text-xl" },
  ];

  return (
    <div
      className={`absolute top-full left-0 right-0 ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      } border-t backdrop-blur-sm z-40`}
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Settings
          </h3>
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 ${
              darkMode ? "hover:text-gray-300" : ""
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Background Selection */}
          <div>
            <h4
              className={`font-medium mb-3 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Background
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, background: bg }))
                  }
                  className={`aspect-video bg-cover bg-center rounded-lg border-2 transition-all ${
                    settings.background === bg
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundImage: `url(${bg})` }}
                />
              ))}
            </div>
          </div>

          {/* Font Selection */}
          <div>
            <h4
              className={`font-medium mb-3 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Font Family
            </h4>
            <div className="space-y-2">
              {fonts.map((font) => (
                <button
                  key={font.class}
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, font: font.class }))
                  }
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    font.class
                  } ${
                    settings.font === font.class
                      ? "border-blue-500 bg-blue-50"
                      : darkMode
                      ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Selection */}
          <div>
            <h4
              className={`font-medium mb-3 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Font Size
            </h4>
            <div className="space-y-2">
              {fontSizes.map((size) => (
                <button
                  key={size.class}
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, fontSize: size.class }))
                  }
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    size.class
                  } ${
                    settings.fontSize === size.class
                      ? "border-blue-500 bg-blue-50"
                      : darkMode
                      ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPanel;