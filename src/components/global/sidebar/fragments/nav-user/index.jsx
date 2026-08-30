"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { IconDotsVertical } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export function NavUser() {
    const { user } = useUser();
    return (
        <SidebarMenu>
            <SidebarMenuItem className="relative">
                <SidebarMenuButton
                    size="lg"
                    className="w-full"
                >
                    <Avatar className="h-8 w-8 rounded-lg grayscale">
                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || "-"} />
                        <AvatarFallback className="rounded-lg">AK</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                            {user?.fullName || "-"}
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                            {user?.primaryEmailAddress?.emailAddress}
                        </span>
                    </div>
                    <IconDotsVertical className="ml-auto size-4" />
                </SidebarMenuButton>
                <div className="absolute inset-0 opacity-0 z-10 flex">
                    <UserButton
                        appearance={{
                            elements: {
                                rootBox: "w-full h-full flex",
                                userButtonBox: "w-full h-full flex",
                                userButtonTrigger: "w-full h-full opacity-0 !min-w-full !min-h-full cursor-pointer",
                                avatarBox: "hidden",
                                userButtonOuterIdentifier: "hidden"
                            }
                        }}
                    />
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
