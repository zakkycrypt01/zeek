"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    return (
        <header className="flex h-16 items-center gap-4 px-4 md:px-8 border-b border-[#312e81]/30 bg-[#151535]/30 backdrop-blur-md sticky top-0 z-30">
            {/* Mobile Menu Trigger */}
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
            </Button>

            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden md:block">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search tokens, transactions..."
                        className="pl-9 bg-white/5 border-white/5 focus:bg-white/10 transition-colors rounded-xl h-10"
                    />
                </div>
            </div>

            <div className="flex-1 md:hidden" />

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                    <div className="relative">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border-2 border-background" />
                    </div>
                </Button>

                <div className="h-8 w-[1px] bg-white/10 mx-1" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="rounded-full pl-2 pr-4 hover:bg-white/5 gap-3 border border-white/5 h-10">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                            <span className="hidden sm:inline-block text-sm font-medium">user@example.com</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                        <DropdownMenuItem>Security</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
