import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { ThemeType, type Quote, type Author } from "@shared/schema";
import { themeColors } from "@shared/data";
import { useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface QuoteCardProps {
  quote: Quote;
  author: Author;
  theme: ThemeType;
}

export default function QuoteCard({ quote, author, theme }: QuoteCardProps) {
  const colors = themeColors[theme];
  const { copy } = useCopyToClipboard();

  const handleTwitterShare = async () => {
    const text = `"${quote.text}" - ${author.name}`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleInstagramShare = async () => {
    alert('Instagram sharing is currently not supported. You can copy the quote and share it manually on Instagram.');
  };

  const handleCopyQuote = async () => {
    const text = `"${quote.text}" - ${author.name}`;
    await copy(text);
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="flex-1">
            <p className="text-sm text-center text-muted-foreground mb-4">new quotes every day</p>
            <blockquote className={`text-lg sm:text-xl md:text-2xl font-serif mb-3 sm:mb-4 ${colors.text} leading-relaxed text-center md:text-left`}>
              "{quote.text}"
            </blockquote>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-3 sm:mt-4">
              <div className="text-center md:text-left">
                <p className="font-semibold text-base sm:text-lg">{author.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{author.bio}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleTwitterShare}
                  className={`${colors.secondary} hover:${colors.primary} hover:text-white transition-colors`}
                >
                  <FaXTwitter className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleInstagramShare}
                  className={`${colors.secondary} hover:${colors.primary} hover:text-white transition-colors`}
                >
                  <FaInstagram className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyQuote}
                  className={`${colors.secondary} hover:${colors.primary} hover:text-white transition-colors`}
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-6 italic">💬 built by Brendan O'Neil, powered by Replit</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}