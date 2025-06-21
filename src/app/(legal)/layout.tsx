import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal - Amader Boi',
  description: 'Legal information for Amader Boi',
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {children}
      </div>
    </div>
  )
}
