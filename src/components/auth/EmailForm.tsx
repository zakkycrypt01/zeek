"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWalletStore } from "@/lib/store/walletStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

export default function EmailForm() {
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const { login } = useWalletStore();
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        await login(values.email);
        router.push("/verify");
    }

    return (
        <div className="grid gap-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel className="text-xs font-bold tracking-wide text-muted-foreground uppercase ml-1">Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="name@email.com"
                                        {...field}
                                        className="h-12 bg-white/5 border-white/10 hover:border-primary/50 focus:border-primary/50 focus:ring-primary/20 transition-all text-white placeholder:text-muted-foreground/40 rounded-xl"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-primary/25 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    );
}
