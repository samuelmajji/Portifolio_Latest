// Contact.jsx
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact({ contactRef }) {
  return (
    <section
      ref={contactRef}
      id="3"
      className="min-h-[90vh] py-10 border-t border-gray-700 text-gray-400"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">CONTACT</h2>
      <div className="space-y-6">
        <p className="leading-relaxed max-w-lg">
          Feel free to reach out to me for recruting, inquiries, or just to say hi! I'm always excited to connect and discuss new ideas.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-teal-400 text-xl" />
            <a
              href="mailto:majji.samuel@example.com"
              className="hover:text-white transition"
            >
              samuelmajji0@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhone className="text-teal-400 text-xl" />
            <a
              href="tel:+1234567890"
              className="hover:text-white transition"
            >
              +91 9063454155
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}