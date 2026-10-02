'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sun, Moon, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '@/context/ThemeContext';
import { signOut } from '@/utils/api/api'; // Imports your custom Axios setup
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

interface AdminNavbarProps {
  adminUser: {
    username: string;
    avatar?: string;
    email: string;
  } | null;
}

export default function AdminNavbar({ adminUser }: AdminNavbarProps) {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const handleAdminSignOut = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out of the admin panel?");
    if (!confirmLogout) return;

    try {
      // Hits your backend auth signout route to clear your cookie cache parameters
      await signOut();
      toast.success("Session closed successfully.");
      window.location.href = '/admin/login';
      router.push('/admin/login'); // Kick back down to login gateway screen
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error("Failed to safely invalidate session.");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border/60 shadow-sm backdrop-blur-md min-h-16 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2">

        {/* Brand Identity Branding Link */}
        <div className="flex items-center gap-2 flex-shrink-0 select-none">
          <AppLogo size={28} />
          <Link href="/">
            <span className="font-poppins font-bold text-sm sm:text-base tracking-tight text-foreground whitespace-nowrap">
              Baylat<span className="text-primary">Admin</span>
            </span>
          </Link>
        </div>

        {/* Right Active Actions Suite Container */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">

          {/* Real-time Dynamic Identity Tag Card */}
          {adminUser && (
            <div className="flex items-center gap-1.5 sm:gap-2 bg-secondary/20 px-2 sm:px-3 py-1.5 rounded-xl border border-border/40 max-w-[145px] sm:max-w-xs min-w-0">
              {adminUser.avatar ? (
                <img
                  src={adminUser.avatar}
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-primary/40"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://pixabay.com'; }}
                />
              ) : (
                <User size={14} className="text-muted-foreground flex-shrink-0" />
              )}
              <span className="text-[11px] sm:text-xs font-semibold text-foreground truncate">
                <span className="hidden sm:inline">Welcome, </span>{adminUser.username || adminUser.email || 'Admin'}
              </span>
            </div>
          )}

          {/* Theme State Switch Control */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border/60 hover:bg-secondary/20 text-foreground transition-all duration-200 flex-shrink-0"
            aria-label="Toggle layout mode"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Core Logout Operations Escape Button */}
          <button
            onClick={handleAdminSignOut}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-2 text-xs font-semibold bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-xl border border-red-500/20 hover:border-red-500 transition-all duration-200 flex-shrink-0"
            aria-label="Logout button"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>

      </div>
    </header>
  );
}
