"use client";

import { User, Shield, Bell, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white font-heading">Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            <div className="space-y-6">

                {/* Profile Section */}
                <div className="bg-[#1e1e42]/50 border border-white/5 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" /> Profile
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <div>
                                <div className="font-medium text-white">Email</div>
                                <div className="text-sm text-muted-foreground">user@example.com</div>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/10">Edit</Button>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-[#1e1e42]/50 border border-white/5 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" /> Security
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <div>
                                <div className="font-medium text-white">Two-Factor Authentication</div>
                                <div className="text-sm text-muted-foreground">Enabled via Email</div>
                            </div>
                            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/10 text-emerald-400 border-emerald-500/20 bg-emerald-500/5">Active</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <div>
                                <div className="font-medium text-white">Biometrics</div>
                                <div className="text-sm text-muted-foreground">Use FaceID/TouchID</div>
                            </div>
                            <Switch />
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-[#1e1e42]/50 border border-white/5 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-amber-500" /> Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                            <div>
                                <div className="font-medium text-white">Transaction Alerts</div>
                                <div className="text-sm text-muted-foreground">Receive alerts for incoming/outgoing funds</div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
