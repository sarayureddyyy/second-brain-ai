import { GraduationCap } from "lucide-react";

const waitlistUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSejWYEeODBE0gQe-dpaemBbTqjJF4OrKRfp23SkW63mmdutQw/viewform?usp=header";

const navItems = [
  { label: "Home", page: "top", href: "/" },
  { label: "The Platform", page: "platform", href: "/platform" },
  { label: "How It Works", page: "how-it-works", href: "/how-it-works" },
  { label: "The Science", page: "science", href: "/science" },
  { label: "Live Demo", page: "live-demo", href: "/demo" },
];

export default function Navbar({ activePage = "top", onNavigate }) {
  const handleNavigate = (event, page) => {
    event.preventDefault();
    onNavigate?.(page);
  };

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-ink/10 bg-paper/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={(event) => handleNavigate(event, "top")}
            className="flex min-w-0 items-center gap-2 text-base font-bold text-ink"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
              <GraduationCap size={20} />
            </span>
            <span className="truncate">Second Brain AI</span>
          </a>
          <a
            href={waitlistUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-coral px-4 py-2.5 text-sm font-bold text-white shadow-card ring-4 ring-coral/15 transition hover:-translate-y-0.5 hover:bg-ink md:px-5"
          >
            Join Waitlist
          </a>
          <a
            href="/login"
            className="shrink-0 rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:border-coral hover:text-coral"
          >
            Log In
          </a>
        </div>
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavigate(event, item.page)}
              aria-current={activePage === item.page ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-bold transition ${
                activePage === item.page
                  ? "bg-coral text-white shadow-card ring-4 ring-coral/15"
                  : "text-ink/60 hover:bg-white hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
