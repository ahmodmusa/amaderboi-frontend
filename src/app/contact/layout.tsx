import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Amader Boi',
  description: 'Get in touch with Amader Boi team for any questions or feedback.'
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
