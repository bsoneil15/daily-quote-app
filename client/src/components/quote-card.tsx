import { Button } from "@/components/ui/button";
import { Copy, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { ThemeType, type Quote, type Author } from "@shared/schema";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: Quote;
  author: Author;
  theme: ThemeType;
}

const themeButtonStyles = {
  leadership: "bg-emerald-500/20 hover:bg-emerald-400/30 text-emerald-100 border-emerald-400/30",
  focus: "bg-blue-500/20 hover:bg-blue-400/30 text-blue-100 border-blue-400/30",
  growth: "bg-amber-500/20 hover:bg-amber-400/30 text-amber-100 border-amber-400/30",
};

export default function QuoteCard({ quote, author, theme }: QuoteCardProps) {
  const { copy } = useCopyToClipboard();

  const handleTwitterShare = () => {
    const text = `"${quote.text}" — ${author.name}`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleEmailShare = () => {
    const subject = "Daily Wisdom Quote";
    const body = `"${quote.text}"\n\n— ${author.name}\n${author.bio}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyQuote = async () => {
    await copy(`"${quote.text}" — ${author.name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <span
          className="absolute -top-4 left-8 text-8xl font-serif text-white/15 leading-none select-none pointer-events-none"
          aria-hidden
        >
          &ldquo;
        </span>

        <motion.blockquote
          key={quote.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl font-serif text-white leading-relaxed mb-8 relative z-10"
        >
          {quote.text}
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
        >
          <div>
            <p className="text-white font-semibold text-base tracking-wide">{author.name}</p>
            <p className="text-white/50 text-sm mt-0.5">{author.bio}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTwitterShare}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                themeButtonStyles[theme]
              )}
            >
              <FaXTwitter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={handleEmailShare}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                themeButtonStyles[theme]
              )}
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Email</span>
            </button>
            <button
              onClick={handleCopyQuote}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                themeButtonStyles[theme]
              )}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </button>
          </div>
        </motion.div>

        <p className="text-white/25 text-xs text-center mt-8 tracking-wide">
          built by{" "}
          <a
            href="https://www.linkedin.com/in/brendanoneil/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors underline underline-offset-2"
          >
            Brendan O'Neil
          </a>
          {" "}· powered by Replit
        </p>
      </div>
    </motion.div>
  );
}
