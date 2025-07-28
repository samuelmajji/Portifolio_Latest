export default function TableEntry({ project }) {
  return (
    <tr className="border-b border-slate-300/20 hover:bg-slate-800/50 transition-colors">
              <td className="py-4 pr-4 text-sm align-top">{project.year}</td>
              <td className="py-4 pr-4 font-semibold align-top leading-snug text-slate-300">
                {project.project_name}
              </td>
              <td className="hidden py-4 pr-4 text-sm align-top lg:table-cell">
                {project.made_at}
              </td>
              <td className="hidden py-4 pr-4 align-top lg:table-cell">
                <ul className="flex flex-wrap -translate-y-1.5">
                    {project.built_with.map((tag, index) => (
                  <li key={index} className="my-1 mr-1.5">
                    <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                      {tag}
                    </div>
                  </li>
                    ))}
                </ul>
              </td>
              <td className="hidden py-4 align-top sm:table-cell">
                <a href="#" className="text-teal-400 hover:underline">
                  {project.link ? (
                    <span className="text-teal-400 hover:underline">
                      {project.link}
                    </span>
                  ) : (
                    <span className="text-gray-500">No Link</span>
                  )}
                </a>
              </td>
            </tr>
  );
}
