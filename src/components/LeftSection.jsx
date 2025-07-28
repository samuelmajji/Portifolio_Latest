import { FaGithub, FaLinkedin, FaCodepen, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LeftSection({
  handleSection,
  introRef,
  projectRef,
  timeLineRef,
  currSection,
  contactRef,
}) {
  return (
    <aside className="lg:col-span-2 lg:sticky lg:top-12 flex flex-col justify-between h-[calc(100vh-3rem)] text-gray-400 mb-20">
      <div>
        <h1 className="text-5xl font-extrabold text-white leading-tight">
          Majji Samuel
        </h1>
        <h2 className="text-lg mt-2 text-teal-400 tracking-wide">
          Web Developer | AI/ML | Data Science · IIT Tirupati
        </h2>

        <p className="mt-6 max-w-sm leading-relaxed">
          I’m a passionate developer with a strong foundation in Python,
          JavaScript, Flask and React. I love turning meaningful ideas into code
          that helps my village and community.
        </p>

        <nav className="mt-10 space-y-3 text-sm font-semibold uppercase tracking-widest">
          <p
            className={
              currSection === "0"
                ? "border-l-2 pl-4 border-white text-white"
                : "pl-4 hover:text-white/90 transition"
            }
            id="0"
            onClick={() => handleSection(introRef, "0")}
          >
            About
          </p>
          <p
            className={
              currSection === "1"
                ? "border-l-2 pl-4 border-white text-white"
                : "pl-4 hover:text-white/90 transition"
            }
            id="1"
            onClick={() => handleSection(timeLineRef, "1")}
          >
            TimeLine
          </p>
          <p
            className={
              currSection === "2"
                ? "border-l-2 pl-4 border-white text-white"
                : "pl-4 hover:text-white/90 transition"
            }
            id="2"
            onClick={() => handleSection(projectRef, "2")}
          >
            Projects
          </p>
          <p
            className={
              currSection === "3"
                ? "border-l-2 pl-4 border-white text-white"
                : "pl-4 hover:text-white/90 transition"
            }
            id="3"
            onClick={() => handleSection(contactRef, "3")}
          >
            Contact
          </p>
        </nav>
      </div>

      <div className="flex space-x-5 text-2xl pb-20">
        <a href="https://github.com/samuelmajji">
          <FaGithub className="hover:text-white transition" />
        </a>
        <a href="https://www.linkedin.com/in/samuel-majji-8b1174283/">
          <FaLinkedin className="hover:text-white transition" />
        </a>
        <a
          href="https://leetcode.com/u/8NeHzmNA1q/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* LeetCode SVG Icon */}
          <svg
            className="hover:text-white transition"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M34.7,44.2c-2.6,0-5.1-1-7-2.9L10.7,24.3c-3.9-3.9-3.9-10.2,0-14.1c3.9-3.9,10.2-3.9,14.1,0l2.1,2.1
                c0.6,0.6,0.6,1.5,0,2.1c-0.6,0.6-1.5,0.6-2.1,0l-2.1-2.1c-2.7-2.7-7.1-2.7-9.8,0c-2.7,2.7-2.7,7.1,0,9.8l17,17
                c2.7,2.7,7.1,2.7,9.8,0c2.7-2.7,2.7-7.1,0-9.8l-2.1-2.1c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l2.1,2.1
                c3.9,3.9,3.9,10.2,0,14.1C39.8,43.2,37.3,44.2,34.7,44.2z"
                fill="currentColor"
              />
              <path
                d="M19.7,35.2c-0.4,0-0.8-0.2-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l14.1-14.1c0.6-0.6,1.5-0.6,2.1,0
                c0.6,0.6,0.6,1.5,0,2.1L20.7,34.8C20.5,35,20.1,35.2,19.7,35.2z"
                fill="#FFA116"
              />
            </g>
          </svg>
        </a>
        <a href="https://www.instagram.com/_samuel._sam/"> <FaInstagram className="hover:text-white transition" /> </a>
      </div>
    </aside>
  );
}
