'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react'; // Swapped User for Mail icon
import { toast } from 'sonner';
import { signin } from '@/app/services/api/api'; // Imports your custom Axios setup
import Navbar from '@/components/layout/Navbar';


export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // POST /api/auth/signin (Axios sets credentials and handles cookie headers automatically)
      const response = await signin(formData);
      const user = response.data;
     

      // Restrict access if the user model isn't configured as an Admin
      if (!user.isAdmin) {
        toast.error('Access Denied: You do not possess administrator privileges.');
        return;
      }

      toast.success(`Welcome back, ${user.username || 'Admin'}!`);
      
      // Direct route redirection down to your management layout dashboard
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Login authentication error:', error);
      toast.error(
        error.response?.data?.message || 'Invalid authentication credentials. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
            <Navbar />
      
      <div className="w-full max-w-md bg-card shadow-card-hover rounded-2xl p-8 border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Access the dashboard to manage listings.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="email" 
                name="email"
                required 
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm" 
                placeholder="admin@baylatproperties.ng"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="password" 
                name="password"
                required 
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground text-sm" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-green disabled:opacity-70 flex justify-center text-sm"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
