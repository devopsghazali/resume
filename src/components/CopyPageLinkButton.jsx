import { useState } from "react";

const CopyPageLinkButton = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="text-xs px-2 py-1 rounded border border-cyan-400/30 bg-cyan-500/10 text-cyan-200 hover:border-cyan-300/60"
      title="Copy page link"
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
};

export default CopyPageLinkButton;
