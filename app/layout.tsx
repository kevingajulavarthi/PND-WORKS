import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'P\\D WORKS - Car Painting & Denting Workshop',
  description: 'Professional car denting, painting, and washing workshop with instant WhatsApp photo-based damage estimates and doorstep pickup & drop service.',
  icons: {
    icon: '/pd-works-logo.jpg'
  },
  openGraph: {
    title: 'P\\D WORKS - Car Painting & Denting Workshop',
    description: 'Professional car denting, painting, and washing workshop with instant WhatsApp photo-based damage estimates and doorstep pickup & drop service.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#F7F8FA] text-[#1E293B] antialiased selection:bg-[#1E56A0] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
        {children}
      </body>
    </html>
  );
}
