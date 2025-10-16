'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './notifications.module.css'

interface Notification {
  id: number
  type: 'announcement' | 'grade' | 'message' | 'deadline' | 'event'
  title: string
  description: string
  time: string
  read: boolean
  color: string
  icon: string
}

const initialNotifications: Notification[] = [
  { id: 1, type: 'announcement', title: 'Важное объявление', description: 'Завтра встреча с представителями IT-компаний в 14:00', time: '10 мин назад', read: false, color: '#FF6B9F', icon: '📢' },
  { id: 2, type: 'grade', title: 'Новая оценка', description: 'Математический анализ: 5 баллов за контрольную работу', time: '1 час назад', read: false, color: '#C8FF00', icon: '⭐' },
  { id: 3, type: 'message', title: 'Новое сообщение', description: 'Проф. Иванов: Перенос лекции на завтра', time: '2 часа назад', read: false, color: '#0A84FF', icon: '💬' },
  { id: 4, type: 'deadline', title: 'Приближается дедлайн', description: 'Сдача домашнего задания по программированию через 2 дня', time: '3 часа назад', read: true, color: '#FFB76B', icon: '⏰' },
  { id: 5, type: 'event', title: 'Новое мероприятие', description: 'Хакатон по AI в эту пятницу. Регистрация открыта!', time: '5 часов назад', read: true, color: '#8B7FFF', icon: '🎉' },
  { id: 6, type: 'grade', title: 'Обновление рейтинга', description: 'Вы поднялись на 12 место в рейтинге курса!', time: '1 день назад', read: true, color: '#30D158', icon: '🏆' },
  { id: 7, type: 'announcement', title: 'Изменение расписания', description: 'Пара по физике перенесена с 18 на 19 октября', time: '1 день назад', read: true, color: '#FF6B9F', icon: '📅' },
  { id: 8, type: 'message', title: 'Сообщение от старосты', description: 'Сбор денег на мероприятие до конца недели', time: '2 дня назад', read: true, color: '#0A84FF', icon: '💬' }
]

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => !n.read)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <motion.button
          className={styles.backButton}
          onClick={() => router.back()}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        <div>
          <h1 className={styles.title}>Уведомления</h1>
          {unreadCount > 0 && (
            <p className={styles.subtitle}>{unreadCount} непрочитанных</p>
          )}
        </div>
        {unreadCount > 0 && (
          <motion.button
            className={styles.markAllButton}
            onClick={markAllAsRead}
            whileTap={{ scale: 0.95 }}
          >
            ✓
          </motion.button>
        )}
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        <motion.button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
          whileTap={{ scale: 0.95 }}
        >
          Все
        </motion.button>
        <motion.button
          className={`${styles.filterButton} ${filter === 'unread' ? styles.active : ''}`}
          onClick={() => setFilter('unread')}
          whileTap={{ scale: 0.95 }}
        >
          Непрочитанные {unreadCount > 0 && `(${unreadCount})`}
        </motion.button>
      </div>

      {/* Notifications List */}
      <div className={styles.content}>
        <AnimatePresence>
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              className={`${styles.notificationCard} ${!notification.read ? styles.unread : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => markAsRead(notification.id)}
            >
              <div className={styles.notificationIcon} style={{ background: `${notification.color}30`, color: notification.color }}>
                {notification.icon}
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationHeader}>
                  <h3 className={styles.notificationTitle}>{notification.title}</h3>
                  <span className={styles.notificationTime}>{notification.time}</span>
                </div>
                <p className={styles.notificationDescription}>{notification.description}</p>
              </div>
              {!notification.read && (
                <div className={styles.unreadDot} style={{ background: notification.color }} />
              )}
              <motion.button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteNotification(notification.id)
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 6L14 14M6 14L14 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔔</div>
            <h3 className={styles.emptyTitle}>Нет уведомлений</h3>
            <p className={styles.emptyText}>
              {filter === 'unread' ? 'Все уведомления прочитаны' : 'У вас пока нет уведомлений'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

