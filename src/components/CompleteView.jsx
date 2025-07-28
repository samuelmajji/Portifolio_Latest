
import { HiArrowUpRight } from "react-icons/hi2";

export default function CompleteView({ text, link }) {
  return (
    <div className="mt-6 ml-5">
      <a
        href={link}
        className="inline-flex items-center text-white hover:text-teal-400 transition-colors duration-300 group"
      >
        <span className="text-sm font-medium tracking-wide">{text}</span>
        <HiArrowUpRight className="ml-2 text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
      </a>
    </div>
  );
}
