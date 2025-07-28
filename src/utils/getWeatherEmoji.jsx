const getWeatherEmoji = (weather) => {
  const weatherEmojis = {
    sunny: "☀️",
    cloudy: "☁️",
    rainy: "🌧️",
    snowy: "❄️",
    stormy: "⛈️",
  };
  return weatherEmojis[weather] || "☀️";
};
export default getWeatherEmoji;