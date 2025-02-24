
import { useState } from 'react';
import { useToast } from './use-toast';

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return { copied, copy };
}
