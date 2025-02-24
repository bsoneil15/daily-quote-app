import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

export function SubscriptionWidget() {
  const { toast } = useToast();
  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (data: SubscribeFormData) => {
      const response = await apiRequest("/api/subscribe", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive daily quotes in your inbox.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to subscribe",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="w-full max-w-sm mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => subscribe(data))} className="flex space-x-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Subscribe
          </Button>
        </form>
      </Form>
    </div>
  );
}