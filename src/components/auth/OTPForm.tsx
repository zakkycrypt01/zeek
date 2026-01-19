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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWalletStore } from "@/lib/store/walletStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    code: z.string().length(6, {
        message: "Verification code must be 6 digits.",
    }),
});

import { useVerifyEmailOTP } from "@coinbase/cdp-hooks";
import { toast } from "sonner";

export default function OTPForm() {
    const [isLoading, setIsLoading] = React.useState(false);

    // Auto-focus refs could be added here for polish

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
    });

    const { flowId, syncAuth } = useWalletStore();
    const { verifyEmailOTP } = useVerifyEmailOTP();
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!flowId) {
            toast.error("Session expired. Please start over.");
            router.push("/login");
            return;
        }

        setIsLoading(true);
        try {
            // 1. Verify OTP with CDP SDK
            const response = await verifyEmailOTP({ flowId, otp: values.code });
            const user = response?.user;

            if (user) {
                // 2. Sync state (mocking wallet data for now as SDK might not return full wallet details immediately in this object structure, strictly following quickstart return)
                // In a real app, we'd fetch the wallet address from the user object or a subsequent call
                syncAuth(true, { id: user.id || 'cdp_user', email: 'verified@user.com' });

                toast.success("Successfully verified!");
                router.push("/wallet");
            } else {
                throw new Error("Verification failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Invalid code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid gap-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            maxLength={6}
                                            className="text-center text-3xl font-mono tracking-[1em] h-16 bg-white/5 border-white/10 focus:border-primary/50 text-white rounded-xl"
                                            placeholder="000000"
                                        />
                                    </div>
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
                        Verify Access
                    </Button>
                </form>
            </Form>

            <div className="text-center">
                <Button variant="link" className="text-sm text-muted-foreground hover:text-white">
                    Resend Code
                </Button>
            </div>
        </div>
    );
}
