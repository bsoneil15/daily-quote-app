import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeType } from "@shared/schema";
import { themeBackgrounds } from "@shared/data";
import QuoteCard from "@/components/quote-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("leadership");

  const { data: quotes, isLoading } = useQuery({
    queryKey: ["/api/quotes/daily"],
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Daily Wisdom
        </h1>

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
          ) : (
            quotes && (
              <QuoteCard
                quote={quotes[selectedTheme].quote}
                author={quotes[selectedTheme].author}
                theme={selectedTheme}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}
