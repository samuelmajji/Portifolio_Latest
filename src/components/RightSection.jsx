
import TimelineItem from "./TimeLine";
import { timelineItems } from "./data/TimeLineItems.js";
import ProjectCard from "./ProjectCard.jsx";
import IntroSection from "./IntroSection.jsx";
import { projects } from "./data/Projects.js";
import CompleteView from "./CompleteView.jsx";
import Contact from "./ContactSection.jsx";

export default function RightSection({ introRef, projectRef, timeLineRef, contactRef }) {
  return (
    <section className="lg:col-span-3 pr-10 mr-5 pl-5 space-y-4 ml-10 leading-relaxed text-gray-400">
      <section ref={introRef} id="0" className=" pb-10">
        <IntroSection />
      </section>

      <section
        ref={timeLineRef}
        id="1"
        className="min-h-[90vh] py-10 border-t border-gray-700 space-y-12"
      >
        {timelineItems.map((item, index) => (
          <TimelineItem
            key={index}
            date={item.date}
            title={item.title}
            company={item.company}
            description={item.description}
            tags={item.tags}
            link={item.link}
          />
        ))}
      </section>
      <CompleteView text={"View Resume"} link={"https://drive.google.com/file/d/1eZ2ypdHPCKcodLuomjPNlj9vb2uLEtfU/view?usp=sharing"} />
      <section ref={projectRef} id="2" className="min-h-[90vh] py-10 mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">PROJECTS</h2>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              stars={project.stars}
              tags={project.tags}
              imageDir={project.imageDir}
            />
          ))}
        </div>
        <CompleteView text={"View Complete Project Archive"} link={"/project"} />
      </section>
      <section ref={contactRef} id="3" className="min-h-[90vh] py-10 mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">PROJECTS</h2>
          <Contact />
      </section>
    </section>
  );
}