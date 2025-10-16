'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './feed.module.css'

interface Post {
  id: number
  author: string
  avatar: string
  role: 'student' | 'teacher' | 'admin'
  time: string
  content: string
  type: 'announcement' | 'news' | 'event' | 'discussion'
  likes: number
  comments: number
  isLiked?: boolean
  attachments?: {
    type: 'image' | 'file'
    name: string
    url?: string
  }[]
  tags?: string[]
}

const posts: Post[] = [
  {
    id: 1,
    author: 'Декан факультета',
    avatar: '#FF6B9F',
    role: 'admin',
    time: '2 часа назад',
    content: '📢 Важное объявление! Завтра, 17 октября, состоится встреча с представителями IT-компаний. Начало в 14:00 в актовом зале. Обязательно посетите!',
    type: 'announcement',
    likes: 156,
    comments: 23,
    tags: ['Важное', 'Карьера']
  },
  {
    id: 2,
    author: 'Студенческий совет',
    avatar: '#0A84FF',
    role: 'student',
    time: '5 часов назад',
    content: '🎉 Приглашаем всех на хакатон по AI в эту пятницу! Призовой фонд 500 000 руб. Регистрация по ссылке в комментариях.',
    type: 'event',
    likes: 89,
    comments: 15,
    isLiked: true,
    tags: ['Хакатон', 'AI']
  },
  {
    id: 3,
    author: 'Проф. Иванов А.С.',
    avatar: '#FFB76B',
    role: 'teacher',
    time: '8 часов назад',
    content: 'Уважаемые студенты! Перенос лекции по математическому анализу с 18 октября на 19 октября. Время остается прежним - 09:00.',
    type: 'announcement',
    likes: 45,
    comments: 8,
    attachments: [
      { type: 'file', name: 'Расписание_изменения.pdf' }
    ]
  },
  {
    id: 4,
    author: 'Библиотека НИУ ВШЭ',
    avatar: '#C8FF00',
    role: 'admin',
    time: '12 часов назад',
    content: '📚 Новые книги по программированию и data science доступны для выдачи! Список в прикрепленном файле. Спешите забронировать!',
    type: 'news',
    likes: 67,
    comments: 12,
    attachments: [
      { type: 'file', name: 'Список_новых_книг.pdf' }
    ],
    tags: ['Библиотека']
  },
  {
    id: 5,
    author: 'Карен Хримян',
    avatar: '#8B7FFF',
    role: 'student',
    time: '1 день назад',
    content: 'Кто-нибудь может поделиться конспектом по линейной алгебре за прошлую неделю? Пропустил занятие по уважительной причине 🙏',
    type: 'discussion',
    likes: 12,
    comments: 7,
    isLiked: true
  },
  {
    id: 6,
    author: 'Спортивный клуб',
    avatar: '#30D158',
    role: 'admin',
    time: '1 день назад',
    content: '⚽ Футбольный турнир между факультетами стартует в следующий понедельник! Регистрация команд до пятницы. Приходите поддержать своих!',
    type: 'event',
    likes: 92,
    comments: 18,
    tags: ['Спорт', 'События']
  }
]

export default function FeedPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2, 5]))

  const filters = [
    { id: 'all', label: 'Все', icon: '📱' },
    { id: 'announcement', label: 'Объявления', icon: '📢' },
    { id: 'event', label: 'События', icon: '🎉' },
    { id: 'news', label: 'Новости', icon: '📰' },
    { id: 'discussion', label: 'Обсуждения', icon: '💬' }
  ]

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter(post => post.type === activeFilter)

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const getRoleLabel = (role: string) => {
    switch(role) {
      case 'teacher': return 'Преподаватель'
      case 'admin': return 'Администрация'
      case 'student': return 'Студент'
      default: return ''
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'teacher': return '#FFB76B'
      case 'admin': return '#FF6B9F'
      case 'student': return '#0A84FF'
      default: return '#8E8E93'
    }
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Лента</h1>
          <p className={styles.subtitle}>Новости и объявления</p>
        </div>
        <div className={styles.headerActions}>
          <motion.button
            className={styles.iconButton}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="2" fill="white"/>
              <circle cx="12" cy="5" r="2" fill="white"/>
              <circle cx="12" cy="19" r="2" fill="white"/>
            </svg>
          </motion.button>
        </div>
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            className={`${styles.filterButton} ${activeFilter === filter.id ? styles.active : ''}`}
            onClick={() => setActiveFilter(filter.id)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.filterIcon}>{filter.icon}</span>
            <span className={styles.filterLabel}>{filter.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Feed Content */}
      <div className={styles.content}>
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className={styles.postCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              {/* Post Header */}
              <div className={styles.postHeader}>
                <div className={styles.authorInfo}>
                  <div
                    className={styles.avatar}
                    style={{ background: post.avatar }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="8" r="3" fill="white"/>
                      <path d="M5 16C5 13.5 7 12 10 12C13 12 15 13.5 15 16" fill="white"/>
                    </svg>
                  </div>
                  <div className={styles.authorDetails}>
                    <div className={styles.authorName}>
                      {post.author}
                      <span
                        className={styles.roleBadge}
                        style={{ background: `${getRoleBadgeColor(post.role)}33`, color: getRoleBadgeColor(post.role) }}
                      >
                        {getRoleLabel(post.role)}
                      </span>
                    </div>
                    <div className={styles.postTime}>{post.time}</div>
                  </div>
                </div>
                <motion.button
                  className={styles.moreButton}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="4" r="1.5" fill="#8E8E93"/>
                    <circle cx="10" cy="10" r="1.5" fill="#8E8E93"/>
                    <circle cx="10" cy="16" r="1.5" fill="#8E8E93"/>
                  </svg>
                </motion.button>
              </div>

              {/* Post Content */}
              <div className={styles.postContent}>
                <p className={styles.postText}>{post.content}</p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.tags}>
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className={styles.tag}>#{tag}</span>
                    ))}
                  </div>
                )}

                {/* Attachments */}
                {post.attachments && post.attachments.length > 0 && (
                  <div className={styles.attachments}>
                    {post.attachments.map((attachment, idx) => (
                      <motion.div
                        key={idx}
                        className={styles.attachment}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={styles.attachmentIcon}>
                          📎
                        </div>
                        <span className={styles.attachmentName}>{attachment.name}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className={styles.postActions}>
                <motion.button
                  className={`${styles.actionButton} ${likedPosts.has(post.id) ? styles.liked : ''}`}
                  onClick={() => handleLike(post.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 17L3 10C1 8 1 5 3 3C5 1 8 1 10 3C12 1 15 1 17 3C19 5 19 8 17 10L10 17Z"
                      fill={likedPosts.has(post.id) ? '#FF453A' : 'none'}
                      stroke={likedPosts.has(post.id) ? '#FF453A' : '#8E8E93'}
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </motion.button>

                <motion.button
                  className={styles.actionButton}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3H17V13H6L3 16V3Z" stroke="#8E8E93" strokeWidth="1.5" fill="none"/>
                  </svg>
                  <span>{post.comments}</span>
                </motion.button>

                <motion.button
                  className={styles.actionButton}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 3L17 8M17 8L12 13M17 8H3" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.emptyIcon}>📭</div>
            <h3 className={styles.emptyTitle}>Пока ничего нет</h3>
            <p className={styles.emptyText}>
              В этой категории пока нет публикаций
            </p>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        className={styles.fab}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </motion.button>

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

        <motion.button
          className={styles.navButton}
          onClick={() => router.push('/messages')}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="6" y="10" width="16" height="2" fill="#8E8E93"/>
            <rect x="6" y="14" width="16" height="2" fill="#8E8E93"/>
            <rect x="6" y="18" width="8" height="2" fill="#8E8E93"/>
          </svg>
        </motion.button>

        <motion.button
          className={styles.navButtonCenter}
          onClick={() => router.push('/services')}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="8" y="8" width="6" height="6" rx="1.5" fill="white"/>
            <rect x="18" y="8" width="6" height="6" rx="1.5" fill="white"/>
            <rect x="8" y="18" width="6" height="6" rx="1.5" fill="white"/>
            <rect x="18" y="18" width="6" height="6" rx="1.5" fill="white"/>
          </svg>
        </motion.button>

        <motion.button
          className={`${styles.navButton} ${styles.active}`}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M8 4L18 14L8 24M10 14L20 4L20 24L10 14Z" fill="#0A84FF"/>
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
