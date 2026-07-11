import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeType, type DailyQuote } from "@shared/schema";
import { themeBackgrounds } from "@shared/data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Copy, ArrowLeft, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "wouter";

const themes: ThemeType[] = ["leadership", "focus", "growth"];
const themeLabels: Record<ThemeType, string> = {
  leadership: "Leadership",
  focus: "Focus",
  growth: "Growth",
};

const themeGradients = {
  leadership: "from-emerald-950/80 via-emerald-900/50 to-emerald-800/20",
  focus: "from-blue-950/80 via-blue-900/50 to-blue-800/20",
  growth: "from-amber-950/80 via-amber-900/50 to-amber-800/20",
};

const themeAccents = {
  leadership: {
    active: "bg-white/20 text-white",
    inactive: "text-white/60 hover:text-white/90 hover:bg-white/10",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
    button: "bg-emerald-500/20 hover:bg-emerald-400/30 text-emerald-100 border-emerald-400/30",
  },
  focus: {
    active: "bg-white/20 text-white",
    inactive: "text-white/60 hover:text-white/90 hover:bg-white/10",
    dot: "bg-blue-400",
    badge: "bg-blue-500/20 text-blue-200 border-blue-400/30",
    button: "bg-blue-500/20 hover:bg-blue-400/30 text-blue-100 border-blue-400/30",
  },
  growth: {
    active: "bg-white/20 text-white",
    inactive: "text-white/60 hover:text-white/90 hover:bg-white/10",
    dot: "bg-amber-400",
    badge: "bg-amber-500/20 text-amber-200 border-amber-400/30",
    button: "bg-amber-500/20 hover:bg-amber-400/30 text-amber-100 border-amber-400/30",
  },
};

function BrowseQuoteCard({ item, index }: { item: DailyQuote; index: number }) {
  const { copy } = useCopyToClipboard();
  const theme = item.quote.theme as ThemeType;
  const accent = themeAccents[theme];

  const handleCopy = async () => {
    await copy(`"${item.quote.text}" — ${item.author.name}`);
  };

  const handleTwitterShare = () => {
    const text = `"${item.quote.text}" — ${item.author.name}`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleEmailShare = () => {
    const subject = "Daily Wisdom Quote";
    const body = `"${item.quote.text}"\n\n— ${item.author.name}\n${item.author.bio}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col gap-4 group"
    >
      <span
        className="absolute -top-3 left-5 text-6xl font-serif text-white/10 leading-none select-none pointer-events-none"
        aria-hidden
      >
        &ldquo;
      </span>

      <span className={cn("self-start text-xs font-medium px-2.5 py-1 rounded-full border capitalize", accent.badge)}>
        {themeLabels[theme]}
      </span>

      <p className="text-white font-serif text-lg leading-relaxed flex-1 relative z-10">
        {item.quote.text}
      </p>

      <div className="flex items-end justify-between gap-3 pt-2 border-t border-white/10">
        <div>
          <p className="text-white/80 font-semibold text-sm">{item.author.name}</p>
          <p className="text-white/40 text-xs mt-0.5">{item.author.bio}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleTwitterShare}
            className={cn(
              "p-2 rounded-full border text-sm transition-all duration-200",
              accent.button
            )}
            title="Share on X"
          >
            <FaXTwitter className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleEmailShare}
            className={cn(
              "p-2 rounded-full border text-sm transition-all duration-200",
              accent.button
            )}
            title="Share via email"
          >
            <Mail className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className={cn(
              "p-2 rounded-full border text-sm transition-all duration-200",
              accent.button
            )}
            title="Copy quote"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Browse() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | "all">("all");
  const bgTheme: ThemeType = selectedTheme === "all" ? "leadership" : selectedTheme;

  const queryKey = selectedTheme === "all"
    ? ["/api/quotes/all"]
    : ["/api/quotes/all", selectedTheme];

  const queryString = selectedTheme === "all" ? "/api/quotes/all" : `/api/quotes/all?theme=${selectedTheme}`;

  const { data: items, isLoading } = useQuery<DailyQuote[]>({
    queryKey,
    queryFn: () => fetch(queryString).then(r => r.json()),
  });

  return (
    <TooltipProvider>
      <div className="relative min-h-screen overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={bgTheme + "-bg"}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${themeBackgrounds[bgTheme]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <AnimatePresence mode="sync">
          <motion.div
            key={bgTheme + "-grad"}
            className={cn("absolute inset-0 bg-gradient-to-b", themeGradients[bgTheme])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="pt-10 pb-4 px-4">
            <div className="flex items-start justify-between max-w-5xl mx-auto w-full">
              <Link href="/">
                <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm pt-1">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Today's Quote</span>
                </button>
              </Link>
              <div className="flex-1 text-center">
                <p className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium mb-3">
                  Library
                </p>
                <h1 className="text-4xl sm:text-5xl font-serif font-light text-white tracking-tight">
                  Explore All Quotes
                </h1>
              </div>
              <div className="pt-1">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <div className="flex justify-center px-4 mt-4 mb-8">
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg">
              <button
                onClick={() => setSelectedTheme("all")}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  selectedTheme === "all"
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:text-white/90 hover:bg-white/10"
                )}
              >
                All
              </button>
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={cn(
                    "relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    selectedTheme === theme
                      ? themeAccents[theme].active
                      : themeAccents[theme].inactive
                  )}
                >
                  {selectedTheme === theme && (
                    <motion.span
                      layoutId="browse-theme-dot"
                      className={cn("w-1.5 h-1.5 rounded-full", themeAccents[theme].dot)}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {themeLabels[theme]}
                </button>
              ))}
            </div>
          </div>

          <main className="flex-1 px-4 pb-16">
            <div className="max-w-5xl mx-auto">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-52 bg-white/10 rounded-2xl" />
                  ))}
                </div>
              ) : items && items.length > 0 ? (
                <>
                  <p className="text-white/40 text-sm text-center mb-6">
                    {items.length} quote{items.length !== 1 ? "s" : ""}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTheme}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {items.map((item, i) => (
                        <BrowseQuoteCard key={item.quote.id} item={item} index={i} />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <p className="text-white/60 text-center py-20">No quotes found</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
