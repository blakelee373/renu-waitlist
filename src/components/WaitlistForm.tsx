import { useState } from "react";

interface WaitlistFormProps {
  onSuccess: () => void;
}

type UserType = "client" | "provider";

const GENDER_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Non-binary", label: "Non-binary" },
  { value: "Other", label: "Other" },
];

const EDGE_FUNCTION_URL =
  "https://cskdyjdulmrafurxyhqm.supabase.co/functions/v1/waitlist-signup";

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [userType, setUserType] = useState<UserType>("client");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const resp = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          userType,
          city,
          gender: gender || undefined,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      onSuccess();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* User type toggle */}
      <div className="flex rounded-lg overflow-hidden border border-brand-border mb-8">
        <button
          type="button"
          onClick={() => setUserType("client")}
          className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
            userType === "client"
              ? "bg-white text-black"
              : "bg-transparent text-brand-muted hover:text-white"
          }`}
        >
          I'm a Client
        </button>
        <button
          type="button"
          onClick={() => setUserType("provider")}
          className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
            userType === "provider"
              ? "bg-white text-black"
              : "bg-transparent text-brand-muted hover:text-white"
          }`}
        >
          I'm a Provider
        </button>
      </div>

      {/* Dynamic copy */}
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4 leading-tight">
        {userType === "client"
          ? "The smarter way to find aesthetic & wellness care."
          : "Get discovered by clients who are ready to book."}
      </h1>
      <p className="text-brand-muted text-center mb-10 text-base leading-relaxed max-w-md mx-auto">
        {userType === "client"
          ? "Compare prices, services, and providers across clinics near you \u2014 so you always know you're getting the best value. RENU is launching soon."
          : "RENU helps aesthetic clinics and wellness brands showcase their services, pricing, and providers to a comparison-savvy audience. Join early to claim your spot."}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-brand-card border border-brand-border text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
        />
        <input
          type="text"
          required
          placeholder="e.g., Austin, TX"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-brand-card border border-brand-border text-white placeholder-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-brand-card border border-brand-border text-brand-muted focus:outline-none focus:border-brand-accent transition-colors appearance-none"
        >
          {GENDER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {errorMessage && (
          <p className="text-red-400 text-sm text-center">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3 rounded-lg bg-brand-cta text-black font-semibold hover:bg-brand-cta-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === "submitting" ? "Joining..." : "Join the Waitlist"}
        </button>
      </form>
    </div>
  );
}
