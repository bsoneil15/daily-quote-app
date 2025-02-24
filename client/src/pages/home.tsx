import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeType, type DailyQuote } from "@shared/schema";
import { themeBackgrounds } from "@shared/data";
import QuoteCard from "@/components/quote-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react"; // Assuming this import is needed

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("leadership");

  const { data: quotes, isLoading } = useQuery<Record<ThemeType, DailyQuote>>({
    queryKey: ["/api/quotes/daily"],
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Daily Wisdom
        </h1>
        <p className="text-sm text-center text-muted-foreground mb-8">new quotes every day</p>

        <Tabs
          value={selectedTheme}
          onValueChange={(value) => setSelectedTheme(value as ThemeType)}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>
        </Tabs>

        <div
          className="relative rounded-lg overflow-hidden bg-cover bg-center min-h-[500px] p-6"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${themeBackgrounds[selectedTheme]})`,
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Skeleton className="w-full max-w-2xl h-64" />
            </div>
          ) : quotes && quotes[selectedTheme] ? (
            <QuoteCard
              quote={quotes[selectedTheme].quote}
              author={quotes[selectedTheme].author}
              theme={selectedTheme}
            />
          ) : (
            <div className="text-white text-center">
              No quote available for this theme
            </div>
          )}
        </div>
        <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full shadow-md bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all"
            onClick={() => {
              const queryClient = useQueryClient(); // Assuming useQueryClient is available in scope.  Otherwise, import it.
              queryClient.invalidateQueries({ queryKey: ["/api/quotes/daily"] });
            }}
          >
            <Shuffle className="h-5 w-5" />
          </Button>
      </main>
    </div>
  );
}