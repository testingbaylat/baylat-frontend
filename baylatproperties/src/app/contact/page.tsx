'use client';
import React from 'react';
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { toast } from 'sonner'

 const metadata: Metadata = {
  title: 'Contact Us | Baylat Properties',
  description: 'Get in touch with Baylat Properties for inquiries about our premium listings.',
};
const handleSend = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("hehe he")
  toast.success('Message sent successfully!');
};

export default function ContactPage() {
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
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Contact Information</h2>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">Our Office</h3>
                <p className="text-muted-foreground">Emperor Estate Plaza, opposite Shoprite,<br />Sangotedo, Lekki-Epe Expressway, Lagos.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">Phone Number</h3>
                <p className="text-muted-foreground">+234 5678<br />+234 56789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">Email Address</h3>
                <p className="text-muted-foreground">info@baylatproperties.com<br />sales@baylatproperties.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">Hours of Operation</h3>
                <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card shadow-card-hover rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form className="space-y-6" >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground" 
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground" 
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground" 
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" 
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button 
                type="button" 
                onClick={handleSend}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-green"
              >
                Send Message
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
