const TimelineItem = ({
  date,
  title,
  company,
  description,
  tags,
  link,   // Add a link prop (default is "#")
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full transition-all duration-300 rounded-lg group hover:bg-white/10 hover:backdrop-blur-sm p-4"
    >
      <div className="text-gray-500 text-xs mb-2">{date}</div>

      <div className="flex items-baseline gap-1 mb-3">
        <h3 className="text-xl font-bold text-teal-400">{title}</h3>
        <span className="text-gray-500">·</span>
        <div className="text-gray-400">{company}</div>
      </div>

      <p className="text-gray-400 group-hover:text-white mb-4">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full border border-teal-300 text-gray-400 bg-teal/70 
                       backdrop-blur-sm hover:bg-teal-500 hover:text-teal-100 hover:border-teal-500 
                       transition-all duration-200 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
};

export default TimelineItem;