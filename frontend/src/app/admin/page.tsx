"use client";

import Link from "next/link";
import { Newspaper, User, Phone, FileUp, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const sections = [
  {
    href: "/admin/articles",
    icon: Newspaper,
    label: "Articles",
    description: "Write, edit, and delete articles",
    color: "text-primary bg-primary/10",
  },
  {
    href: "/admin/bio",
    icon: User,
    label: "Bio",
    description: "Edit your biography and personal statement",
    color: "text-primary bg-primary/10",
  },
  {
    href: "/admin/contact",
    icon: Phone,
    label: "Contact",
    description: "Manage your contact information",
    color: "text-primary bg-primary/10",
  },
  {
    href: "/admin/resume",
    icon: FileUp,
    label: "Resume / CV",
    description: "Upload or replace your CV file",
    color: "text-primary bg-primary/10",
  },
  {
    href: "/admin/account",
    icon: Settings,
    label: "Account",
    description: "Change your email and password",
    color: "text-primary bg-primary/10",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-10 max-w-2xl">
      <h1 className="text-2xl font-semibold text-text-primary mb-1">Dashboard</h1>
      <p className="text-text-secondary text-sm mb-8">
        Welcome back{user?.email ? `, ${user.email}` : ""}.
      </p>

      <div className="space-y-3">
        {sections.map(({ href, icon: Icon, label, description, color }) => (
          <Link
            key={href}
            href={href}
            className="group border border-border-color bg-white rounded-2xl px-6 py-4 flex items-center gap-4 hover:border-primary/40 transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-text-primary font-medium text-sm group-hover:text-primary transition-colors mb-0.5">
                {label}
              </h2>
              <p className="text-text-secondary text-xs">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
