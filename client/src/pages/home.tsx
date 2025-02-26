import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeType, type DailyQuote } from "@shared/schema";
import { themeBackgrounds, themeColors } from "@shared/data";
import QuoteCard from "@/components/quote-card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("leadership");

  const { data: quotes, isLoading } = useQuery<Record<ThemeType, DailyQuote>>({
    queryKey: ["/api/quotes/daily"],
  });

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500",
      selectedTheme === "leadership" && "bg-emerald-50",
      selectedTheme === "focus" && "bg-blue-50",
      selectedTheme === "growth" && "bg-amber-50"
    )}>
      <main className="container max-w-6xl mx-auto px-4 py-8">
        <h1 className={cn(
          "text-4xl font-bold text-center mb-2",
          selectedTheme === "leadership" && "text-emerald-900",
          selectedTheme === "focus" && "text-blue-900",
          selectedTheme === "growth" && "text-amber-900"
        )}>
          Daily Wisdom
        </h1>
        <p className="text-sm text-center text-muted-foreground mb-8">New quotes every day</p>

        <Tabs
          value={selectedTheme}
          onValueChange={(value) => setSelectedTheme(value as ThemeType)}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger 
              value="leadership"
              className={cn(
                "data-[state=active]:text-white transition-all duration-200",
                selectedTheme === "leadership" && "data-[state=active]:bg-emerald-700"
              )}
            >
              Leadership
            </TabsTrigger>
            <TabsTrigger 
              value="focus"
              className={cn(
                "data-[state=active]:text-white transition-all duration-200",
                selectedTheme === "focus" && "data-[state=active]:bg-blue-700"
              )}
            >
              Focus
            </TabsTrigger>
            <TabsTrigger 
              value="growth"
              className={cn(
                "data-[state=active]:text-white transition-all duration-200",
                selectedTheme === "growth" && "data-[state=active]:bg-amber-900"
              )}
            >
              Growth
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <motion.div
          className="relative rounded-lg overflow-hidden bg-cover bg-center min-h-[500px] p-6"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${themeBackgrounds[selectedTheme]})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Skeleton className="w-full max-w-2xl h-64" />
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
            <div className="text-white text-center">
              No quote available for this theme
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}