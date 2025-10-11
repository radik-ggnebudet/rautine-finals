'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './calendar.module.css'

interface DaySchedule {
  day: string
  date: string
  isToday: boolean
  classes: ClassItem[]
}

interface ClassItem {
  time: string
  subject: string
  room: string
  type: 'lecture' | 'practice' | 'exam'
  completed?: boolean
}

const weekSchedule: DaySchedule[] = [
  {
    day: 'Понедельник',
    date: '11 окт',
    isToday: true,
    classes: [
      { time: '09:00', subject: 'Математический анализ', room: 'Ауд. 301', type: 'lecture' },
      { time: '10:45', subject: 'Программирование', room: 'Ауд. 205', type: 'practice' },
      { time: '12:30', subject: 'Английский язык', room: 'Ауд. 110', type: 'practice' },
      { time: '14:15', subject: 'Физика', room: 'Ауд. 402', type: 'lecture' }
    ]
  },
  {
    day: 'Вторник',
    date: '12 окт',
    isToday: false,
    classes: [
      { time: '09:00', subject: 'Линейная алгебра', room: 'Ауд. 301', type: 'lecture' },
      { time: '10:45', subject: 'Структуры данных', room: 'Ауд. 205', type: 'practice' },
      { time: '14:15', subject: 'Математическая логика', room: 'Ауд. 308', type: 'lecture' }
    ]
  },
  {
    day: 'Среда',
    date: '13 окт',
    isToday: false,
    classes: [
      { time: '09:00', subject: 'Физика', room: 'Ауд. 402', type: 'practice' },
      { time: '10:45', subject: 'Английский язык', room: 'Ауд. 110', type: 'practice' },
      { time: '12:30', subject: 'Программирование', room: 'Ауд. 205', type: 'lecture' }
    ]
  },
  {
    day: 'Четверг',
    date: '14 окт',
    isToday: false,
    classes: [
      { time: '09:00', subject: 'Математический анализ', room: 'Ауд. 301', type: 'practice' },
      { time: '10:45', subject: 'Структуры данных', room: 'Ауд. 205', type: 'lecture' },
      { time: '14:15', subject: 'Линейная алгебра', room: 'Ауд. 301', type: 'practice' }
    ]
  },
  {
    day: 'Пятница',
    date: '15 окт',
    isToday: false,
    classes: [
      { time: '09:00', subject: 'Математическая логика', room: 'Ауд. 308', type: 'practice' },
      { time: '12:30', subject: 'Хакатон по AI', room: 'Ауд. 105', type: 'exam' }
    ]
  }
]

export default function CalendarPage() {
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState<number>(0)

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <motion.button
          className={styles.backButton}
          onClick={() => router.push('/home')}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        <h1 className={styles.title}>Расписание</h1>
        <button className={styles.iconButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="4" width="14" height="16" rx="2" stroke="white" strokeWidth="2"/>
            <path d="M8 2V6M16 2V6M5 9H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {/* Week Days Tabs */}
      <div className={styles.weekTabs}>
        {weekSchedule.map((day, index) => (
          <motion.button
            key={index}
            className={`${styles.dayTab} ${selectedDay === index ? styles.active : ''} ${day.isToday ? styles.today : ''}`}
            onClick={() => setSelectedDay(index)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.dayName}>{day.day.substring(0, 2)}</span>
            <span className={styles.dayDate}>{day.date.split(' ')[0]}</span>
          </motion.button>
        ))}
      </div>

      {/* Schedule Content */}
      <div className={styles.content}>
        <motion.div
          key={selectedDay}
          className={styles.daySchedule}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.dayHeader}>
            <h2 className={styles.dayTitle}>{weekSchedule[selectedDay].day}</h2>
            <span className={styles.dateLabel}>{weekSchedule[selectedDay].date}</span>
          </div>

          <div className={styles.classList}>
            {weekSchedule[selectedDay].classes.map((classItem, index) => (
              <motion.div
                key={index}
                className={styles.classItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.timeColumn}>
                  <span className={styles.classTime}>{classItem.time}</span>
                  <div className={styles.timeDot} style={{
                    background: classItem.type === 'exam' ? '#FF6B9F' :
                               classItem.type === 'lecture' ? '#0A84FF' : '#C8FF00'
                  }} />
                  <div className={styles.timeLine} />
                </div>

                <div className={styles.classContent}>
                  <div className={styles.classHeader}>
                    <h3 className={styles.className}>{classItem.subject}</h3>
                    <span className={`${styles.classType} ${styles[classItem.type]}`}>
                      {classItem.type === 'exam' ? 'Экзамен' :
                       classItem.type === 'lecture' ? 'Лекция' : 'Практика'}
                    </span>
                  </div>
                  <div className={styles.classInfo}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="3" width="10" height="9" rx="1" stroke="#8E8E93" strokeWidth="1.5"/>
                      <path d="M4 1V3M10 1V3" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className={styles.roomLabel}>{classItem.room}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {weekSchedule[selectedDay].classes.length === 0 && (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="#2C2C2E" strokeWidth="3"/>
                <path d="M32 20V32L40 40" stroke="#2C2C2E" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <p className={styles.emptyText}>Занятий нет</p>
            </div>
          )}
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
          className={`${styles.navButton} ${styles.active}`}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="6" y="6" width="6" height="6" fill="#0A84FF"/>
            <rect x="16" y="6" width="6" height="6" fill="#0A84FF"/>
            <rect x="6" y="16" width="6" height="6" fill="#0A84FF"/>
            <rect x="16" y="16" width="6" height="6" fill="#0A84FF"/>
          </svg>
        </motion.button>
      </nav>
    </div>
  )
}

