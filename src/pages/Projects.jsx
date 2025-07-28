import TableEntry from "../components/TableEntry";
import majorProjects from "../components/data/majorProjects";
import React from "react";

const Projects = () => {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-20">
      <a
        href="#content"
        className="absolute left-0 top-0 block -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus:visible:translate-x-0"
      >
        Skip to Content
      </a>
      <div className="lg:py-24">
        <a
          className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-300"
          href="/"
        >
          <span aria-hidden="true">&larr;</span>
        </a>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          All Projects
        </h1>
        <table id="content" className="mt-12 w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur">
            <tr>
              <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                Year
              </th>
              <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                Project
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                Made at
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                Built with
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {majorProjects.map((project, index) => (
              <TableEntry
                key={index}
                project={project}/>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
