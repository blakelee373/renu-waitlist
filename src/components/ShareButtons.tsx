import { useState } from "react";

const SHARE_URL = "https://renuwaitlist.com";
const SHARE_TEXT =
  "I just joined the RENU waitlist \u2014 a smarter way to compare aesthetic & wellness clinics. Check it out:";

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = SHARE_URL;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      SHARE_TEXT
    )}&url=${encodeURIComponent(SHARE_URL)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "RENU Waitlist",
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
      } catch {
        // User cancelled
      }
    }
  };

  const supportsNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
      <button
        onClick={handleCopy}
        className="w-full py-3 rounded-lg border border-brand-border text-white font-medium hover:bg-brand-card transition-colors cursor-pointer"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>

      <button
        onClick={handleTwitter}
        className="w-full py-3 rounded-lg border border-brand-border text-white font-medium hover:bg-brand-card transition-colors cursor-pointer"
      >
        Share on X
      </button>

      {supportsNativeShare && (
        <button
          onClick={handleNativeShare}
          className="w-full py-3 rounded-lg border border-brand-border text-white font-medium hover:bg-brand-card transition-colors cursor-pointer"
        >
          Share...
        </button>
      )}
    </div>
  );
}
