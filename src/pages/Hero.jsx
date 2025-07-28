import { useState, useRef, useEffect } from "react";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";

function Hero() {
  const introRef = useRef(null);
  const projectRef = useRef(null);
  const timeLineRef = useRef(null);
  const contactRef = useRef(null);

  const [currSection, setCurrSection] = useState('0');

  function handleSection(ref, n) {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setCurrSection(n);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            setCurrSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px', // Adjusts when the section is considered in view
      }
    );

    const sections = [
      introRef.current,
      timeLineRef.current,
      projectRef.current,
      contactRef.current
    ].filter(Boolean);

    sections.forEach((sec) => sec && observer.observe(sec));

    return () => {
      sections.forEach((sec) => sec && observer.unobserve(sec));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 px-6 lg:px-20 py-20 my-5">
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-12">
            <LeftSection
              introRef={introRef}
              projectRef={projectRef}
              timeLineRef={timeLineRef}
              contactRef={contactRef}
              handleSection={handleSection}
              currSection={currSection}
            />
          </div>
        </div>
        <div className="lg:col-span-3">
          <RightSection
            introRef={introRef}
            projectRef={projectRef}
            timeLineRef={timeLineRef}
            contactRef={contactRef}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;


