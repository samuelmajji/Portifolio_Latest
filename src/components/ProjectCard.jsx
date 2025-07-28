const ProjectCard = ({
  title,
  description,
  date,
  tags,
  imageDir,
}) => {
  return (
    <div className="block w-full transition-all duration-300 rounded-lg group hover:bg-white/10 hover:backdrop-blur-sm p-4">
      <div className="md:flex">
        {/* Image Section */}
        <div className="md:w-2/5 pt-10">
          <div className="aspect-[16/10] w-full bg-gray-800">
            <img
              src={imageDir}
              alt={title}
              className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:w-3/5">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <div className="flex items-center bg-yellow-900/30 px-3 py-1 rounded-full"></div>
          </div>

          <p className="mt-3 text-gray-300 leading-relaxed">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full border border-gray-700 text-gray-300 bg-gray-800/50 hover:bg-gray-700/70 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
