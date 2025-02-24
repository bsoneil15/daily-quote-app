import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
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

  const generateQuoteImage = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 630;

    if (!ctx) return null;

    // Set background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add quote text
    ctx.font = '48px serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    // Wrap text
    const words = quote.text.split(' ');
    let line = '';
    let lines = [];
    let y = 200;

    for (let word of words) {
      const testLine = line + word + ' ';
      if (ctx.measureText(testLine).width > canvas.width - 100) {
        lines.push(line);
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Draw wrapped text
    lines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, y);
      y += 60;
    });

    // Add author
    ctx.font = '32px sans-serif';
    ctx.fillText(`- ${author.name}`, canvas.width / 2, y + 40);

    return canvas.toDataURL('image/png');
  };

  const handleDownload = async () => {
    const imageUrl = await generateQuoteImage();
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.download = `quote-${author.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = imageUrl;
    link.click();
  };

  const handleTwitterShare = async () => {
    const text = `"${quote.text}" - ${author.name}`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleInstagramShare = async () => {
    // Since Instagram doesn't have a web share API, we'll generate and download the image
    const imageUrl = await generateQuoteImage();
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.download = `instagram-quote-${author.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = imageUrl;
    link.click();

    // Show instructions for Instagram
    alert('Image downloaded! To share on Instagram:\n1. Open Instagram\n2. Create a new post\n3. Select the downloaded image\n4. Share!');
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="flex-1">
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
                  onClick={handleDownload}
                  className={`${colors.secondary} hover:${colors.primary} hover:text-white transition-colors`}
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}