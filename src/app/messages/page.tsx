'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './messages.module.css'

interface Message {
  id: number
  name: string
  preview: string
  time: string
  avatar: string
  unread?: boolean
  muted?: boolean
  verified?: boolean
  online?: boolean
}

const messages: Message[] = [
  {
    id: 1,
    name: 'Аревик Хримян',
    preview: 'Привет',
    time: 'Сейчас',
    avatar: '#8B7FFF',
    verified: true
  },
  {
    id: 2,
    name: 'Карен Хримян',
    preview: 'Привет! Как де...',
    time: '17 мин.',
    avatar: '#6B9FFF',
    unread: true,
    online: true
  },
  {
    id: 3,
    name: 'Эстер Акопян А...',
    preview: 'Привет! Нужны...',
    time: '25 мин.',
    avatar: '#FF6B9F',
    unread: true,
    muted: true,
    verified: true
  },
  {
    id: 4,
    name: 'Меликсетян Ли...',
    preview: 'Здравствуйте!...',
    time: '29 мин.',
    avatar: '#FFB76B',
    unread: true,
    muted: true,
    verified: true
  }
]

export default function MessagesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('students')

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Пространства</h1>
        <div className={styles.headerActions}>
          <button className={styles.iconButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 14H16L14 18H10L8 14H4L6 8H18L20 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.iconButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="6" width="16" height="2" fill="white"/>
              <rect x="4" y="11" width="16" height="2" fill="white"/>
              <rect x="4" y="16" width="16" height="2" fill="white"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="@surge"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={styles.clearButton}
            onClick={() => setSearchQuery('')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" fill="#3A3A3C"/>
              <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.button>
        )}
      </div>

      {/* Sidebar */}
      <div className={styles.sidebar}>
        <motion.button
          className={styles.sidebarButton}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.iconCircle} style={{ background: '#C8FF00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="6" width="16" height="2" fill="black"/>
              <rect x="4" y="11" width="16" height="2" fill="black"/>
              <rect x="4" y="16" width="16" height="2" fill="black"/>
            </svg>
          </div>
        </motion.button>

        <motion.button
          className={styles.sidebarButton}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.iconCircle} style={{ background: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3" stroke="black" strokeWidth="2"/>
              <path d="M6 19C6 16 8 14 12 14C16 14 18 16 18 19" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className={styles.notificationBadge}>@</div>
        </motion.button>

        <motion.button
          className={styles.sidebarButton}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.iconCircle} style={{ background: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="9" r="3" stroke="black" strokeWidth="2"/>
              <circle cx="16" cy="16" r="3" stroke="black" strokeWidth="2"/>
              <path d="M11 7L14 10M11 11L14 14" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </motion.button>

        <motion.button
          className={styles.sidebarButton}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.iconCircle} style={{ background: 'white' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3" stroke="black" strokeWidth="2"/>
              <path d="M6 19C6 16 8 14 12 14C16 14 18 16 18 19" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </motion.button>

        <motion.button
          className={styles.sidebarButton}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.iconCircle} style={{ background: '#C8FF00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5C12 5 15 8 15 12C15 16 12 19 12 19C12 19 9 16 9 12C9 8 12 5 12 5Z" stroke="black" strokeWidth="2"/>
            </svg>
          </div>
        </motion.button>
      </div>

      {/* Messages Section */}
      <div className={styles.messagesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Сообщения</h2>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <motion.button
            className={`${styles.tab} ${activeTab === 'students' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('students')}
            whileTap={{ scale: 0.97 }}
          >
            Студенты
            <span className={styles.tabBadge}>12</span>
          </motion.button>
          <motion.button
            className={`${styles.tab} ${activeTab === 'teachers' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('teachers')}
            whileTap={{ scale: 0.97 }}
          >
            Преподаватели
          </motion.button>
          <motion.button
            className={`${styles.tab} ${activeTab === 'tech' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('tech')}
            whileTap={{ scale: 0.97 }}
          >
            Те...
          </motion.button>
        </div>

        {/* Messages List */}
        <motion.div className={styles.messagesList} layout>
          <AnimatePresence>
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                className={styles.messageItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                whileHover={{ backgroundColor: '#1C1C1E' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/chat/${message.id}`)}
                layout
              >
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar} style={{ background: message.avatar }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="12" r="5" fill="white" fillOpacity="0.9"/>
                      <path d="M8 26C8 22 11 19 16 19C21 19 24 22 24 26" fill="white" fillOpacity="0.9"/>
                    </svg>
                  </div>
                  {message.online && <div className={styles.onlineIndicator} />}
                </div>

                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <h3 className={styles.messageName}>{message.name}</h3>
                    <span className={styles.messageTime}>{message.time}</span>
                  </div>
                  <div className={styles.messagePreviewRow}>
                    <p className={styles.messagePreview}>{message.preview}</p>
                    {message.unread && <div className={styles.unreadDot} />}
                  </div>
                </div>

                <div className={styles.messageActions}>
                  {message.verified && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" fill="#007AFF"/>
                      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {message.muted && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '4px' }}>
                      <path d="M2 2L14 14M8 3V8M8 11V13" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <motion.button
          className={styles.navButton}
          onClick={() => router.push('/home')}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="4" width="9" height="9" rx="2" stroke="#8E8E93" strokeWidth="2"/>
            <rect x="15" y="4" width="9" height="9" rx="2" stroke="#8E8E93" strokeWidth="2"/>
            <rect x="4" y="15" width="9" height="9" rx="2" stroke="#8E8E93" strokeWidth="2"/>
            <rect x="15" y="15" width="9" height="9" rx="2" stroke="#8E8E93" strokeWidth="2"/>
          </svg>
        </motion.button>

        <motion.button className={`${styles.navButton} ${styles.active}`} whileTap={{ scale: 0.9 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="6" y="10" width="16" height="2" fill="#0A84FF"/>
            <rect x="6" y="14" width="16" height="2" fill="#0A84FF"/>
            <rect x="6" y="18" width="8" height="2" fill="#0A84FF"/>
          </svg>
        </motion.button>

        <motion.button
          className={styles.navButtonCenter}
          onClick={() => router.push('/services')}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="14" y="8" width="4" height="16" fill="white"/>
            <rect x="8" y="14" width="16" height="4" fill="white"/>
          </svg>
        </motion.button>

        <motion.button className={styles.navButton} whileTap={{ scale: 0.9 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M8 4L18 14L8 24M10 14L20 4L20 24L10 14Z" fill="#8E8E93"/>
          </svg>
        </motion.button>

        <motion.button
          className={styles.navButton}
          onClick={() => router.push('/calendar')}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="6" y="6" width="6" height="6" stroke="#8E8E93" strokeWidth="2"/>
            <rect x="16" y="6" width="6" height="6" stroke="#8E8E93" strokeWidth="2"/>
            <rect x="6" y="16" width="6" height="6" stroke="#8E8E93" strokeWidth="2"/>
            <rect x="16" y="16" width="6" height="6" stroke="#8E8E93" strokeWidth="2"/>
          </svg>
        </motion.button>
      </nav>
    </div>
  )
}
