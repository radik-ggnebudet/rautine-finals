'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './services.module.css'

interface Service {
  id: number
  title: string
  icon: string
  color: string
  description: string
  route?: string
}

const services: Service[] = [
  {
    id: 1,
    title: 'Библиотека',
    icon: '📚',
    color: '#FF6B9F',
    description: 'Каталог и бронирование книг',
    route: '/library'
  },
  {
    id: 2,
    title: 'Домашние задания',
    icon: '✅',
    color: '#30D158',
    description: 'Трекер заданий и дедлайнов',
    route: '/homework'
  },
  {
    id: 3,
    title: 'Уведомления',
    icon: '🔔',
    color: '#0A84FF',
    description: 'Все оповещения в одном месте',
    route: '/notifications'
  },
  {
    id: 4,
    title: 'Темы',
    icon: '🎨',
    color: '#8B7FFF',
    description: 'Персонализация интерфейса',
    route: '/themes'
  },
  {
    id: 5,
    title: 'Столовая',
    icon: '🍽️',
    color: '#FFB76B',
    description: 'Меню и заказ еды'
  },
  {
    id: 6,
    title: 'Спорт',
    icon: '⚽',
    color: '#00D4FF',
    description: 'Расписание тренировок'
  },
  {
    id: 7,
    title: 'Транспорт',
    icon: '🚌',
    color: '#C8FF00',
    description: 'Расписание автобусов'
  },
  {
    id: 8,
    title: 'Документы',
    icon: '📄',
    color: '#FF9F0A',
    description: 'Справки и заявления'
  },
  {
    id: 9,
    title: 'Карьера',
    icon: '💼',
    color: '#FF453A',
    description: 'Вакансии и стажировки'
  }
]

export default function ServicesPage() {
  const router = useRouter()

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
        <h1 className={styles.title}>Сервисы</h1>
        <div style={{ width: 40 }} />
      </header>

      {/* Services Grid */}
      <div className={styles.content}>
        <p className={styles.subtitle}>Все необходимые сервисы в одном месте</p>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.serviceCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => service.route && router.push(service.route)}
              style={{ cursor: service.route ? 'pointer' : 'default' }}
            >
              <div className={styles.serviceIcon} style={{ background: service.color }}>
                <span className={styles.emoji}>{service.icon}</span>
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          className={styles.quickActions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>Быстрые действия</h2>

          <motion.button
            className={styles.actionButton}
            whileHover={{ backgroundColor: '#1C1C1E' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.actionIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.actionContent}>
              <h4 className={styles.actionTitle}>Заказать справку</h4>
              <p className={styles.actionDescription}>Получите за 1 день</p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <motion.button
            className={styles.actionButton}
            whileHover={{ backgroundColor: '#1C1C1E' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.actionIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="13" rx="2" stroke="#30D158" strokeWidth="2"/>
                <path d="M3 10H21" stroke="#30D158" strokeWidth="2"/>
              </svg>
            </div>
            <div className={styles.actionContent}>
              <h4 className={styles.actionTitle}>Оплатить обучение</h4>
              <p className={styles.actionDescription}>Быстро и безопасно</p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <motion.button
            className={styles.actionButton}
            whileHover={{ backgroundColor: '#1C1C1E' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.actionIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7 5 5 8 5C10 5 11 6 12 7C13 6 14 5 16 5C19 5 21 7 21 10Z" stroke="#FF453A" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.actionContent}>
              <h4 className={styles.actionTitle}>Записаться к врачу</h4>
              <p className={styles.actionDescription}>Медицинский центр</p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
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
          className={`${styles.navButtonCenter} ${styles.active}`}
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
          className={styles.navButton}
          onClick={() => router.push('/feed')}
          whileTap={{ scale: 0.9 }}
        >
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
