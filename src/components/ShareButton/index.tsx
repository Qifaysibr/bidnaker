'use client'

import React, { useState, useEffect } from 'react'
import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaEnvelope,
  FaShareAlt,
  FaTimes,
} from 'react-icons/fa'

interface ShareButtonProps {
  post: {
    title: string
    slug: string
  }
  className?: string
  alwaysOpen?: boolean
}

export const ShareButton: React.FC<ShareButtonProps> = ({ post, className, alwaysOpen = false }) => {
  const [isOpen, setIsOpen] = useState(alwaysOpen)
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const shareData = {
    title: post.title,
    text: post.title,
    url: url,
  }

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={24} />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareData.text} ${shareData.url}`,
      )}`,
    },
    {
      name: 'Facebook',
      icon: <FaFacebook size={24} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'Twitter',
      icon: <FaTwitter size={24} />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareData.url,
      )}&text=${encodeURIComponent(shareData.text)}`,
    },
    {
      name: 'Telegram',
      icon: <FaTelegram size={24} />,
      url: `https://t.me/share/url?url=${encodeURIComponent(
        shareData.url,
      )}&text=${encodeURIComponent(shareData.text)}`,
    },
    {
      name: 'Email',
      icon: <FaEnvelope size={24} />,
      url: `mailto:?subject=${encodeURIComponent(shareData.text)}&body=${encodeURIComponent(
        shareData.url,
      )}`,
    },
  ]

  if (alwaysOpen) {
    return (
      <div className="flex gap-2">
        {shareOptions.map(option => (
          <a
            key={option.name}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {option.icon}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pks text-white p-4 rounded-full shadow-lg hover:bg-pks/80 focus:outline-none focus:ring-2 focus:ring-opacity-50 animate-bounce"
        aria-label="Share post"
      >
        {isOpen ? <FaTimes size={24} /> : <FaShareAlt size={24} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-lg dark:bg-gray-800">
          {shareOptions.map(option => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {option.icon}
              <span className="text-sm">{option.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
