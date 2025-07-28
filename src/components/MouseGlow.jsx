import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-40 w-60 h-60 bg-white/10 blur-3xl rounded-full"
        style={{
          left: position.x - 120, // center offset (48*2)
          top: position.y - 120,
        }}
      />
    </>
  );
}