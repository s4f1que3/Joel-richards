"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border-color">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/Joel logo.png" alt="Joel Richards" width={40} height={40} className="h-10 w-10" priority />
        </Link>
        <div className="flex items-center gap-8">
          <a href="/#articles" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
            Articles
          </a>
          <a href="/#contact" className="text-text-secondary hover:text-text-primary text-sm transition-colors">
            Contact
          </a>
          {user ? (
            <div className="flex items-center gap-5">
              <Link href="/admin" className="text-sm text-primary hover:text-primary-dark transition-colors font-medium">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm bg-primary text-white font-medium px-4 py-1.5 rounded-full hover:bg-primary-dark transition-colors"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
