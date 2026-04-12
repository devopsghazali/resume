import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-[60] rounded-full border border-cyan-400/35 bg-[#0e1322]/90 px-4 py-2 text-xs text-cyan-200 shadow-lg shadow-cyan-900/30 backdrop-blur hover:border-cyan-300/70"
      aria-label="Back to top"
      title="Back to top"
    >
      Top
    </button>
  );
};

export default BackToTopButton;
