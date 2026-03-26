import { ShareButtons } from "./ShareButtons";

export function SuccessView() {
  return (
    <div className="text-center">
      <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
        You're in.
      </h1>
      <p className="text-brand-muted text-base mb-10 max-w-sm mx-auto leading-relaxed">
        We'll let you know when RENU launches near you. In the meantime, help us
        spread the word.
      </p>
      <ShareButtons />
    </div>
  );
}
