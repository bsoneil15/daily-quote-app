import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeType, type DailyQuote } from "@shared/schema";
import { themeBackgrounds } from "@shared/data";
import QuoteCard from "@/components/quote-card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  },
  focus: {
    active: "bg-white/20 text-white",
    inactive: "text-white/60 hover:text-white/90 hover:bg-white/10",
    dot: "bg-blue-400",
  },
  growth: {
    active: "bg-white/20 text-white",
    inactive: "text-white/60 hover:text-white/90 hover:bg-white/10",
    dot: "bg-amber-400",
  },
};

const themes: ThemeType[] = ["leadership", "focus", "growth"];
const themeLabels: Record<ThemeType, string> = {
  leadership: "Leadership",
  focus: "Focus",
  growth: "Growth",
};

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("leadership");

  const { data: quotes, isLoading } = useQuery<Record<ThemeType, DailyQuote>>({
    queryKey: ["/api/quotes/daily"],
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={selectedTheme + "-bg"}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${themeBackgrounds[selectedTheme]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      <AnimatePresence mode="sync">
        <motion.div
          key={selectedTheme + "-grad"}
          className={cn("absolute inset-0 bg-gradient-to-b", themeGradients[selectedTheme])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="pt-12 pb-4 text-center px-4">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Daily Wisdom
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-white tracking-tight">
            Today's Insight
          </h1>
        </header>

        <div className="flex justify-center px-4 mt-4 mb-8">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-lg">
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
                    layoutId="theme-dot"
                    className={cn("w-1.5 h-1.5 rounded-full", themeAccents[theme].dot)}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {themeLabels[theme]}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-1 flex items-center justify-center px-4 pb-16">
          {isLoading ? (
            <div className="w-full max-w-2xl space-y-4">
              <Skeleton className="h-8 w-3/4 mx-auto bg-white/10" />
              <Skeleton className="h-6 w-full bg-white/10" />
              <Skeleton className="h-6 w-5/6 mx-auto bg-white/10" />
              <Skeleton className="h-4 w-1/3 mx-auto bg-white/10 mt-6" />
            </div>
          ) : quotes && quotes[selectedTheme] ? (
            <AnimatePresence mode="wait">
              <QuoteCard
                key={selectedTheme}
                quote={quotes[selectedTheme].quote}
                author={quotes[selectedTheme].author}
                theme={selectedTheme}
              />
            </AnimatePresence>
          ) : (
            <p className="text-white/60 text-center">No quote available for this theme</p>
          )}
        </main>
      </div>
    </div>
  );
}
