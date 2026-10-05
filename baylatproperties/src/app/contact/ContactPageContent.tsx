'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import API from '@/utils/api/api';

export default function ContactPageContent() {
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('firstName') || '').trim();
    const lastName = String(formData.get('lastName') || '').trim();

    setIsSending(true);
    try {
      const response = await API.post('/mail/send-contact', {
        name: [firstName, lastName].filter(Boolean).join(' '),
        email: String(formData.get('email') || '').trim(),
        phone: String(formData.get('phone') || '').trim(),
        message: String(formData.get('message') || '').trim(),
      });
      toast.success(response.data?.message || 'Message sent successfully!');
      form.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Could not send your message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 mt-8">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Whether you&apos;re looking to buy, sell, or manage a property, our team of experts is here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary"><MapPin size={24} /></div>
                <div><h3 className="font-semibold text-lg text-foreground mb-1">Our Office</h3><p className="text-muted-foreground">Emperor Estate Plaza, opposite Shoprite,<br />Sangotedo, Lekki-Epe Expressway, Lagos.</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary"><Phone size={24} /></div>
                <div><h3 className="font-semibold text-lg text-foreground mb-1">Phone Number</h3><p className="text-muted-foreground">+234 916 974 9620<br />+234 703 754 4327</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary"><Mail size={24} /></div>
                <div><h3 className="font-semibold text-lg text-foreground mb-1">Email Address</h3><p className="text-muted-foreground">info@baylatproperties.com<br />sales@baylatproperties.com</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary"><Clock size={24} /></div>
                <div><h3 className="font-semibold text-lg text-foreground mb-1">Hours of Operation</h3><p className="text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM</p></div>
              </div>
            </div>

            <div className="bg-card shadow-card-hover rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form className="space-y-6" onSubmit={handleSend}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <input id="firstName" name="firstName" required autoComplete="given-name" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <input id="lastName" name="lastName" required autoComplete="family-name" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <input id="email" name="email" type="email" required autoComplete="email" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone Number <span className="text-muted-foreground">(optional)</span></label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground" placeholder="+234..." />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" placeholder="How can we help you today?" />
                </div>
                <button type="submit" disabled={isSending} className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-green disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
