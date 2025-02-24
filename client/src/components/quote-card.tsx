import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { ThemeType, type Quote, type Author } from "@shared/schema";
import { themeColors } from "@shared/data";
import { useState } from "react";

interface QuoteCardProps {
  quote: Quote;
  author: Author;
  theme: ThemeType;
}

export default function QuoteCard({ quote, author, theme }: QuoteCardProps) {
  const colors = themeColors[theme];
  const [imageError, setImageError] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Daily Wisdom",
      text: `"${quote.text}" - ${author.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            {!imageError ? (
              <img
                src={author.imageUrl}
                alt={author.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${colors.primary} text-white text-2xl font-bold`}>
                {author.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <blockquote className={`text-2xl font-serif mb-4 ${colors.text} leading-relaxed`}>
              "{quote.text}"
            </blockquote>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="font-semibold">{author.name}</p>
                <p className="text-sm text-muted-foreground">{author.bio}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className={`${colors.secondary} hover:${colors.primary} hover:text-white transition-colors`}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}