'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './home.module.css'

interface Schedule {
  time: string
  subject: string
  room: string
  type: 'lecture' | 'practice'
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  color: string
}

interface SubjectGrade {
  name: string
  grade: number
  credits: number
  color: string
}

interface SubjectDetails {
  subject: string
  lastTopic: string
  homework: string
}

const todaySchedule: Schedule[] = [
  { time: '09:00', subject: 'Математический анализ', room: 'Ауд. 301', type: 'lecture' },
  { time: '10:45', subject: 'Программирование', room: 'Ауд. 205', type: 'practice' },
  { time: '12:30', subject: 'Английский язык', room: 'Ауд. 110', type: 'practice' },
  { time: '14:15', subject: 'Физика', room: 'Ауд. 402', type: 'lecture' }
]

const events: Event[] = [
  { id: 1, title: 'Хакатон по AI', date: '15 окт', time: '10:00', color: '#FF6B9F' },
  { id: 2, title: 'Защита проектов', date: '20 окт', time: '14:00', color: '#0A84FF' },
  { id: 3, title: 'Лекция про ML', date: '22 окт', time: '16:00', color: '#FFB76B' }
]

const subjectGrades: SubjectGrade[] = [
  { name: 'Математический анализ', grade: 5.0, credits: 6, color: '#C8FF00' },
  { name: 'Линейная алгебра', grade: 4.0, credits: 5, color: '#0A84FF' },
  { name: 'Структуры данных', grade: 4.0, credits: 4, color: '#FF6B9F' },
  { name: 'Математическая логика', grade: 3.0, credits: 3, color: '#FFB76B' }
]

const subjectDetailsData: { [key: string]: SubjectDetails } = {
  'Математический анализ': {
    subject: 'Математический анализ',
    lastTopic: 'Производные высших порядков и правило Лопиталя',
    homework: 'Решить задачи №12-18 из задачника Демидовича, подготовить конспект по теореме Тейлора'
  },
  'Программирование': {
    subject: 'Программирование',
    lastTopic: 'Алгоритмы сортировки: QuickSort и MergeSort',
    homework: 'Реализовать алгоритмы сортировки на Python, написать unit-тесты для проверки корректности'
  },
  'Английский язык': {
    subject: 'Английский язык',
    lastTopic: 'Present Perfect vs Present Perfect Continuous',
    homework: 'Упражнения 5-8 на стр. 45-47, написать эссе на тему "My Future Career" (200 слов)'
  },
  'Физика': {
    subject: 'Физика',
    lastTopic: 'Законы термодинамики и тепловые машины',
    homework: 'Решить задачи из сборника Иродова №3.1-3.5, подготовиться к лабораторной работе'
  }
}

export default function HomePage() {
  const router = useRouter()
  const [showGpaPopup, setShowGpaPopup] = useState(false)
  const [showSubjectPopup, setShowSubjectPopup] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<SubjectDetails | null>(null)
  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()

  const nextClass = todaySchedule.find(schedule => {
    const [hour, minute] = schedule.time.split(':').map(Number)
    return hour > currentHour || (hour === currentHour && minute > currentMinute)
  })

  const calculateGPA = () => {
    const totalPoints = subjectGrades.reduce((sum, subject) => sum + (subject.grade * subject.credits), 0)
    const totalCredits = subjectGrades.reduce((sum, subject) => sum + subject.credits, 0)
    return (totalPoints / totalCredits).toFixed(1)
  }

  const handleScheduleClick = (subject: string) => {
    const details = subjectDetailsData[subject]
    if (details) {
      setSelectedSubject(details)
      setShowSubjectPopup(true)
    }
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <p className={styles.greeting}>Добро пожаловать!</p>
          <h1 className={styles.title}>Главная</h1>
        </div>
        <motion.button
          className={styles.profileButton}
          onClick={() => router.push('/profile')}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.avatar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="10" r="3" fill="white"/>
              <path d="M6 20C6 17 8 15 12 15C16 15 18 17 18 20" fill="white"/>
            </svg>
          </div>
        </motion.button>
      </header>

      <div className={styles.content}>
        {/* GPA Card */}
        <motion.div
          className={styles.gpaCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowGpaPopup(true)}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.gpaHeader}>
            <div>
              <p className={styles.gpaLabel}>Средний балл</p>
              <h2 className={styles.gpaValue}>{calculateGPA()}</h2>
            </div>
            <div className={styles.gpaIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#C8FF00" strokeWidth="3"/>
                <path d="M15 20L18 23L25 16" stroke="#C8FF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <p className={styles.gpaSubtext}>Отличная работа! Продолжай в том же духе 🎉</p>
        </motion.div>

        {/* Next Class */}
        {nextClass && (
          <motion.div
            className={styles.nextClassCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Следующая пара</h3>
              <span className={styles.badge}>{nextClass.type === 'lecture' ? 'Лекция' : 'Практика'}</span>
            </div>
            <h4 className={styles.subjectName}>{nextClass.subject}</h4>
            <div className={styles.classInfo}>
              <div className={styles.infoItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#8E8E93" strokeWidth="1.5"/>
                  <path d="M8 4V8L11 10" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>{nextClass.time}</span>
              </div>
              <div className={styles.infoItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="4" width="10" height="9" rx="1" stroke="#8E8E93" strokeWidth="1.5"/>
                  <path d="M5 2V4M11 2V4" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>{nextClass.room}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Today's Schedule */}
        <motion.div
          className={styles.scheduleSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={styles.sectionTitle}>Расписание на сегодня</h3>
          <div className={styles.scheduleList}>
            {todaySchedule.map((item, index) => (
              <motion.div
                key={index}
                className={styles.scheduleItem}
                whileHover={{ backgroundColor: '#1C1C1E' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleScheduleClick(item.subject)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.scheduleTime}>
                  <span className={styles.timeText}>{item.time}</span>
                  <div className={styles.timeLine} />
                </div>
                <div className={styles.scheduleContent}>
                  <h4 className={styles.scheduleSubject}>{item.subject}</h4>
                  <p className={styles.scheduleRoom}>{item.room}</p>
                </div>
                <span className={`${styles.typeBadge} ${styles[item.type]}`}>
                  {item.type === 'lecture' ? 'Лек' : 'Прак'}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Events */}
        <motion.div
          className={styles.eventsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className={styles.sectionTitle}>Мероприятия</h3>
          <div className={styles.eventsList}>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className={styles.eventCard}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ borderLeft: `4px solid ${event.color}` }}
              >
                <h4 className={styles.eventTitle}>{event.title}</h4>
                <div className={styles.eventInfo}>
                  <span className={styles.eventDate}>{event.date}</span>
                  <span className={styles.eventTime}>{event.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <motion.button className={`${styles.navButton} ${styles.active}`} whileTap={{ scale: 0.9 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="4" width="9" height="9" rx="2" fill="#0A84FF"/>
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
            <rect x="14" y="8" width="4" height="16" fill="white"/>
            <rect x="8" y="14" width="16" height="4" fill="white"/>
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

      {/* GPA Details Popup */}
      <AnimatePresence>
        {showGpaPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGpaPopup(false)}
            />

            {/* Popup */}
            <div className={styles.popupWrapper}>
              <motion.div
                className={styles.popup}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <div className={styles.popupHeader}>
                  <h2 className={styles.popupTitle}>Детализация оценок</h2>
                  <motion.button
                    className={styles.closeButton}
                    onClick={() => setShowGpaPopup(false)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>

                <div className={styles.popupContent}>
                  {/* Overall GPA */}
                  <div className={styles.overallGpa}>
                    <div className={styles.overallGpaLeft}>
                      <span className={styles.overallGpaLabel}>Средний балл</span>
                      <span className={styles.overallGpaValue}>{calculateGPA()}</span>
                    </div>
                    <div className={styles.overallGpaRight}>
                      <span className={styles.totalCredits}>{subjectGrades.reduce((sum, s) => sum + s.credits, 0)} кредитов</span>
                    </div>
                  </div>

                  {/* Subjects List */}
                  <div className={styles.subjectsList}>
                    {subjectGrades.map((subject, index) => (
                      <motion.div
                        key={index}
                        className={styles.subjectItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={styles.subjectLeft}>
                          <div
                            className={styles.subjectColorDot}
                            style={{ background: subject.color }}
                          />
                          <div className={styles.subjectInfo}>
                            <h4 className={styles.subjectName}>{subject.name}</h4>
                            <p className={styles.subjectCredits}>{subject.credits} кредитов</p>
                          </div>
                        </div>
                        <div className={styles.subjectGrade} style={{ color: subject.color }}>
                          {subject.grade.toFixed(1)}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer Info */}
                  <div className={styles.popupFooter}>
                    <p className={styles.footerText}>
                      Оценки обновляются автоматически после каждого экзамена
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Subject Details Popup */}
      <AnimatePresence>
        {showSubjectPopup && selectedSubject && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubjectPopup(false)}
            />

            {/* Popup */}
            <div className={styles.popupWrapper}>
              <motion.div
                className={styles.subjectPopup}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <div className={styles.popupHeader}>
                  <h2 className={styles.popupTitle}>{selectedSubject.subject}</h2>
                  <motion.button
                    className={styles.closeButton}
                    onClick={() => setShowSubjectPopup(false)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>

                <div className={styles.popupContent}>
                  {/* Last Topic */}
                  <div className={styles.detailSection}>
                    <div className={styles.detailHeader}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 6H16M4 10H16M4 14H12" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <h3 className={styles.detailTitle}>Последняя тема</h3>
                    </div>
                    <p className={styles.detailText}>{selectedSubject.lastTopic}</p>
                  </div>

                  {/* Homework */}
                  <div className={styles.detailSection}>
                    <div className={styles.detailHeader}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="4" y="4" width="12" height="12" rx="2" stroke="#C8FF00" strokeWidth="2"/>
                        <path d="M7 10L9 12L13 8" stroke="#C8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h3 className={styles.detailTitle}>Домашнее задание</h3>
                    </div>
                    <p className={styles.detailText}>{selectedSubject.homework}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
