// Helper Functions
const getMoodEmoji = (mood) => {
  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    neutral: "😐",
    excited: "🤩",
    angry: "😠",
  };
  return moodEmojis[mood] || "😐";
};
export default getMoodEmoji;