'use client';

import { useState } from 'react';
import { FiFacebook, FiTwitter, FiSend, FiMail, FiLink } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title, description = '' }: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const shareLinks = [
    {
      name: 'Facebook',
      icon: <FiFacebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`,
      bg: 'bg-[#1877F2] hover:bg-[#166FE5]',
      text: 'text-white',
    },
    {
      name: 'X (Twitter)',
      icon: <FiTwitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      bg: 'bg-black hover:bg-gray-900',
      text: 'text-white',
    },
    {
      name: 'Telegram',
      icon: <FiSend className="w-4 h-4" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      bg: 'bg-[#0088CC] hover:bg-[#007AB8]',
      text: 'text-white',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-4 h-4" />,
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      bg: 'bg-[#25D366] hover:bg-[#1DA851]',
      text: 'text-white',
    },
    {
      name: 'Email',
      icon: <FiMail className="w-4 h-4" />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${description}\n\n${url}`)}`,
      bg: 'bg-gray-600 hover:bg-gray-700',
      text: 'text-white',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    alert('Link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-10 h-10 rounded-full ${link.bg} ${link.text} hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md`}
          title={`Share on ${link.name}`}
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className={`flex items-center justify-center w-10 h-10 rounded-full ${isCopied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-200 shadow-sm hover:shadow-md`}
        title="Copy link"
        aria-label="Copy link"
      >
        <FiLink className={`w-4 h-4 ${isCopied ? 'text-white' : 'text-gray-700'}`} />
      </button>
    </div>
  );
}
