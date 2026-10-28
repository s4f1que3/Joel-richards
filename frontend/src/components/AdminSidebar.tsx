"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Newspaper, User, Phone, FileUp, Settings, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/articles", label: "Articles", icon: Newspaper, exact: false },
  { href: "/admin/bio", label: "Bio", icon: User, exact: false },
  { href: "/admin/contact", label: "Contact", icon: Phone, exact: false },
  { href: "/admin/resume", label: "Resume / CV", icon: FileUp, exact: false },
  { href: "/admin/account", label: "Account", icon: Settings, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <aside className="w-56 shrink-0 border-r border-border-color min-h-screen p-5 flex flex-col bg-white">
      <Link href="/" className="flex items-center mb-8">
        <Image src="/Joel logo.png" alt="Joel Richards" width={40} height={40} className="h-10 w-10" priority />
      </Link>
      <nav className="flex flex-col gap-0.5 flex-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-red-600 transition-colors mt-4"
      >
        <LogOut size={15} />
        Sign out
      </button>
    </aside>
  );
}
