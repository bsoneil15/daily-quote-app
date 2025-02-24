import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Copy } from "lucide-react";

// ... other imports ...

function ShareSheet({ shareText, onShare }) {
  const { copy } = useCopyToClipboard();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {/* ... other content ... */}
      <div className="flex justify-between items-center mt-4">
        <ThemeToggle />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => copy(shareText)} size="icon">
            <Copy className="h-4 w-4" />
          </Button>
          <Button onClick={onShare}>Share</Button>
        </div>
      </div>
      {/* ... rest of the component ... */}
    </div>
  );
}

export default ShareSheet;