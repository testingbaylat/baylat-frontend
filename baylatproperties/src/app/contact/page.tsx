import type { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us | Baylat Properties',
  description: 'Get in touch with Baylat Properties for inquiries about our premium listings.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
