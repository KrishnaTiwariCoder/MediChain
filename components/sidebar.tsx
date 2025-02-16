"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Pill,
  User,
  LogOut,
} from "lucide-react";
import { getWeb3 } from "@/lib/web3";
import { useWallet } from "@/lib/wallet-context";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    label: "Appointments",
    icon: Calendar,
    href: "/appointments",
  },
  {
    label: "Medicine",
    icon: Pill,
    href: "/medicine",
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { account, setAccount } = useWallet();

  const handleConnect = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = async () => {
    setAccount(null);
    if (window.ethereum && window.ethereum.request) {
      await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
    }
  };

  if (!account) return null;

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-secondary/10 border-r">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Medical DApp</h2>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3">
        {!account ? (
          <Button
            onClick={handleConnect}
            className="w-full justify-start"
            variant="outline"
          >
            <User className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        ) : (
          <div className="space-y-2">
            <div className="px-4 py-2 text-xs text-muted-foreground break-all">
              {account}
            </div>
            <Button
              onClick={handleDisconnect}
              className="w-full justify-start text-red-500"
              variant="outline"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
