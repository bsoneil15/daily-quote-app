import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { ThemeType, type Quote, type Author } from "@shared/schema";
import { themeColors } from "@shared/data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { motion } from "framer-motion";

interface QuoteCardProps {
  quote: Quote;
  author: Author;
  theme: ThemeType;
}

export default function QuoteCard({ quote, author, theme }: QuoteCardProps) {
  const colors = themeColors[theme];
  const { copy } = useCopyToClipboard();
  const borderColorClasses = {
    leadership: 'border-green-500',
    focus: 'border-blue-500',
    growth: 'border-amber-500'
  };

  const handleTwitterShare = async () => {
    const text = `"${quote.text}" - ${author.name}`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleEmailShare = async () => {
    const subject = "Daily Wisdom Quote";
    const body = `"${quote.text}"\n\n- ${author.name}\n${author.bio}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyQuote = async () => {
    const text = `"${quote.text}" - ${author.name}`;
    await copy(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`backdrop-blur-sm bg-white/90 max-w-2xl mx-auto shadow-lg border-2 ${borderColorClasses[theme] || colors.text.replace('text-', 'border-')}`}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <motion.blockquote 
                key={quote.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-lg sm:text-xl md:text-2xl font-serif mb-3 sm:mb-4 ${colors.text} leading-relaxed text-center md:text-left`}
              >
                "{quote.text}"
              </motion.blockquote>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-3 sm:mt-4"
              >
                <div className="text-center md:text-left">
                  <p className={`font-semibold text-base sm:text-lg ${colors.text}`}>{author.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{author.bio}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleTwitterShare}
                    className={`${colors.primary} ${colors.text} border-current hover:bg-current hover:text-white transition-colors`}
                  >
                    <FaXTwitter className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleEmailShare}
                    className={`${colors.primary} ${colors.text} border-current hover:bg-current hover:text-white transition-colors`}
                  >
                    <MdEmail className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyQuote}
                    className={`${colors.primary} ${colors.text} border-current hover:bg-current hover:text-white transition-colors`}
                  >
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </motion.div>
              <p className="text-xs text-center text-muted-foreground mt-6 italic">💬 built by Brendan O'Neil, powered by Replit</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}