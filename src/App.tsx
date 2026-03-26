import { useState } from "react";
import { WaitlistForm } from "./components/WaitlistForm";
import { SuccessView } from "./components/SuccessView";

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-brand-dark">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(120, 119, 198, 0.15), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255, 255, 255, 0.05), transparent 50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <img
          src="/images/renu-logo.png"
          alt="RENU"
          className="h-20 mb-12 opacity-90"
        />

        {/* Form or Success */}
        <div className="animate-fade-in" key={submitted ? "success" : "form"}>
          {submitted ? (
            <SuccessView />
          ) : (
            <WaitlistForm onSuccess={() => setSubmitted(true)} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-brand-muted text-xs">
        &copy; {new Date().getFullYear()} RENU. All rights reserved.
      </footer>
    </div>
  );
}
