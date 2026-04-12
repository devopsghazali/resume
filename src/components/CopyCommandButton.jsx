import { useState } from "react";

const CopyCommandButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={onCopy}
      className="text-[11px] px-2 py-1 rounded border border-cyan-400/30 bg-cyan-500/10 text-cyan-200 hover:border-cyan-300/60"
      type="button"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

export default CopyCommandButton;
