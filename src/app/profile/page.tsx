'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './profile.module.css'

interface Achievement {
  id: number
  title: string
  icon: string
  color: string
  description: string
  progress: number
  unlocked: boolean
}

interface Activity {
  id: number
  type: 'assignment' | 'lecture' | 'message' | 'achievement'
  title: string
  description: string
  time: string
  icon: string
}

const achievements: Achievement[] = [
  { id: 1, title: 'Отличник', icon: '🏆', color: '#FFD700', description: 'Средний балл выше 4.5', progress: 100, unlocked: true },
  { id: 2, title: '100 дней', icon: '🔥', color: '#FF6B9F', description: '100 дней подряд без пропусков', progress: 100, unlocked: true },
  { id: 3, title: 'Хакатон 2024', icon: '💻', color: '#0A84FF', description: 'Победитель хакатона', progress: 100, unlocked: true },
  { id: 4, title: 'Книжный червь', icon: '📖', color: '#C8FF00', description: 'Прочитано 10+ книг', progress: 100, unlocked: true },
  { id: 5, title: 'Староста', icon: '⭐', color: '#FFB76B', description: 'Староста группы', progress: 100, unlocked: true },
  { id: 6, title: 'Ранняя птаха', icon: '🌅', color: '#30D158', description: 'Посещено 50 пар в 9:00', progress: 75, unlocked: false },
  { id: 7, title: 'Социальный', icon: '💬', color: '#8B7FFF', description: '1000 сообщений отправлено', progress: 60, unlocked: false }
]

const recentActivity: Activity[] = [
  { id: 1, type: 'assignment', title: 'Сдал задание', description: 'Математический анализ', time: '2 часа назад', icon: '📝' },
  { id: 2, type: 'lecture', title: 'Посетил лекцию', description: 'Программирование', time: 'Вчера', icon: '✅' },
  { id: 3, type: 'message', title: 'Новое сообщение', description: 'От преподавателя', time: '1 день назад', icon: '💬' },
  { id: 4, type: 'achievement', title: 'Новое достижение!', description: 'Книжный червь', time: '2 дня назад', icon: '🎉' }
]

export default function ProfilePage() {
  const router = useRouter()
  const [showAchievementPopup, setShowAchievementPopup] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [showEditPopup, setShowEditPopup] = useState(false)

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement)
    setShowAchievementPopup(true)
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
        <h1 className={styles.headerTitle}>Профиль</h1>
        <motion.button
          className={styles.editButton}
          onClick={() => setShowEditPopup(true)}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 20H21M3 20H8M16 4L20 8L8 20L3 21L4 16L16 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </header>

      <div className={styles.content}>
        {/* Profile Info */}
        <motion.div
          className={styles.profileSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.avatarWrapper}>
            <div className={styles.progressRing}>
              <svg width="110" height="110">
                <circle cx="55" cy="55" r="52" fill="none" stroke="#1C1C1E" strokeWidth="6"/>
                <circle 
                  cx="55" 
                  cy="55" 
                  r="52" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52 * 0.85} ${2 * Math.PI * 52}`}
                  transform="rotate(-90 55 55)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0A84FF" />
                    <stop offset="100%" stopColor="#C8FF00" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <motion.div 
              className={styles.avatar}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="18" r="8" fill="white"/>
                <path d="M10 40C10 32 15 28 24 28C33 28 38 32 38 40" fill="white"/>
              </svg>
            </motion.div>
          </div>

          <h2 className={styles.userName}>Иван Иванов</h2>
          <div className={styles.userRole}>
            <span className={styles.roleBadge}>Студент</span>
            <span className={styles.roleSeparator}>•</span>
            <span className={styles.roleText}>2 курс</span>
          </div>
          <p className={styles.userBio}>Изучаю программирование и люблю математику 📚</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className={styles.statsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className={styles.statCard}
            style={{ borderTop: '3px solid #C8FF00' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.statIcon} style={{ background: 'rgba(200, 255, 0, 0.15)' }}>
              ⭐
            </div>
            <div className={styles.statValue} style={{ color: '#C8FF00' }}>4.5</div>
            <div className={styles.statLabel}>Средний балл</div>
          </motion.div>

          <motion.div 
            className={styles.statCard}
            style={{ borderTop: '3px solid #30D158' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.statIcon} style={{ background: 'rgba(48, 209, 88, 0.15)' }}>
              ✅
            </div>
            <div className={styles.statValue} style={{ color: '#30D158' }}>95%</div>
            <div className={styles.statLabel}>Посещаемость</div>
          </motion.div>

          <motion.div 
            className={styles.statCard}
            style={{ borderTop: '3px solid #FFB76B' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.statIcon} style={{ background: 'rgba(255, 183, 107, 0.15)' }}>
              🏆
            </div>
            <div className={styles.statValue} style={{ color: '#FFB76B' }}>#12</div>
            <div className={styles.statLabel}>Рейтинг</div>
          </motion.div>
        </motion.div>

        {/* Academic Info */}
        <motion.div
          className={styles.infoCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>📚</div>
            <h3 className={styles.cardTitle}>Академическая информация</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Факультет</span>
              <span className={styles.infoValue}>Компьютерные науки</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Специальность</span>
              <span className={styles.infoValue}>Программная инженерия</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Курс</span>
              <span className={styles.infoValue}>2</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Группа</span>
              <span className={styles.infoValue}>БПИ-225</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Студ. билет</span>
              <span className={styles.infoValue}>#20225678</span>
            </div>
          </div>
        </motion.div>

        {/* Personal Info */}
        <motion.div
          className={styles.infoCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>👤</div>
            <h3 className={styles.cardTitle}>Личная информация</h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>ivanov@edu.hse.ru</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Телефон</span>
              <span className={styles.infoValue}>+7 (999) 123-45-67</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Дата рождения</span>
              <span className={styles.infoValue}>15.03.2005</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Город</span>
              <span className={styles.infoValue}>Москва</span>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className={styles.achievementsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>🎓 Достижения</h3>
            <span className={styles.achievementCount}>{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
          </div>
          <div className={styles.achievementsList}>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`${styles.achievementBadge} ${!achievement.unlocked ? styles.locked : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAchievementClick(achievement)}
              >
                <div 
                  className={styles.badgeIcon}
                  style={{ 
                    background: achievement.unlocked ? achievement.color : '#2C2C2E',
                    filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
                  }}
                >
                  {achievement.icon}
                </div>
                {!achievement.unlocked && achievement.progress > 0 && (
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className={styles.actionsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className={styles.sectionTitle}>⚡ Быстрые действия</h3>
          <div className={styles.actionsList}>
            <motion.button 
              className={styles.actionButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.actionIcon}>⚙️</div>
              <span className={styles.actionText}>Настройки</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 15L12 10L7 5" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button 
              className={styles.actionButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.actionIcon}>🔔</div>
              <span className={styles.actionText}>Уведомления</span>
              <div className={styles.notificationBadge}>3</div>
            </motion.button>

            <motion.button 
              className={styles.actionButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.actionIcon}>🌙</div>
              <span className={styles.actionText}>Тема оформления</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 15L12 10L7 5" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button 
              className={styles.actionButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.actionIcon}>📄</div>
              <span className={styles.actionText}>Мои документы</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 15L12 10L7 5" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button 
              className={styles.actionButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.actionIcon}>📊</div>
              <span className={styles.actionText}>Статистика</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 15L12 10L7 5" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button 
              className={styles.actionButton}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.actionIcon}>💳</div>
              <span className={styles.actionText}>Оплата</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 15L12 10L7 5" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className={styles.activitySection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className={styles.sectionTitle}>📱 Недавняя активность</h3>
          <div className={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                className={styles.activityItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <div className={styles.activityIcon}>{activity.icon}</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityTitle}>{activity.title}</div>
                  <div className={styles.activityDescription}>{activity.description}</div>
                </div>
                <div className={styles.activityTime}>{activity.time}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          className={styles.logoutButton}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Выйти из аккаунта
        </motion.button>

        <div className={styles.appVersion}>Версия 1.0.0</div>
      </div>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievementPopup && selectedAchievement && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAchievementPopup(false)}
            />
            <div className={styles.popupWrapper}>
              <motion.div
                className={styles.achievementPopup}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <div
                  className={styles.popupBadge}
                  style={{ background: selectedAchievement.color }}
                >
                  <span className={styles.popupBadgeIcon}>{selectedAchievement.icon}</span>
                </div>
                <h3 className={styles.popupTitle}>{selectedAchievement.title}</h3>
                <p className={styles.popupDescription}>{selectedAchievement.description}</p>

                {!selectedAchievement.unlocked && (
                  <div className={styles.popupProgress}>
                    <div className={styles.popupProgressBar}>
                      <div
                        className={styles.popupProgressFill}
                        style={{ width: `${selectedAchievement.progress}%` }}
                      />
                    </div>
                    <span className={styles.popupProgressText}>{selectedAchievement.progress}%</span>
                  </div>
                )}

                <motion.button
                  className={styles.popupButton}
                  onClick={() => setShowAchievementPopup(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedAchievement.unlocked ? 'Отлично!' : 'Продолжить'}
                </motion.button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

