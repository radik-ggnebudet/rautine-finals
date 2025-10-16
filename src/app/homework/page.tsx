'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './homework.module.css'

interface Homework {
  id: number
  title: string
  subject: string
  deadline: string
  priority: 'urgent' | 'important' | 'normal'
  completed: boolean
  progress: number
  subtasks: { id: number; text: string; completed: boolean }[]
}

const initialHomework: Homework[] = [
  {
    id: 1,
    title: 'Решить задачи по математическому анализу',
    subject: 'Математический анализ',
    deadline: '2025-10-18',
    priority: 'urgent',
    completed: false,
    progress: 60,
    subtasks: [
      { id: 1, text: 'Задачи №12-15', completed: true },
      { id: 2, text: 'Задачи №16-18', completed: true },
      { id: 3, text: 'Конспект по теореме Тейлора', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Реализовать алгоритмы сортировки',
    subject: 'Программирование',
    deadline: '2025-10-20',
    priority: 'important',
    completed: false,
    progress: 30,
    subtasks: [
      { id: 1, text: 'QuickSort на Python', completed: true },
      { id: 2, text: 'MergeSort на Python', completed: false },
      { id: 3, text: 'Написать unit-тесты', completed: false }
    ]
  },
  {
    id: 3,
    title: 'Эссе "My Future Career"',
    subject: 'Английский язык',
    deadline: '2025-10-22',
    priority: 'normal',
    completed: false,
    progress: 0,
    subtasks: [
      { id: 1, text: 'Написать план эссе', completed: false },
      { id: 2, text: 'Написать черновик (200 слов)', completed: false },
      { id: 3, text: 'Проверить грамматику', completed: false }
    ]
  },
  {
    id: 4,
    title: 'Задачи из сборника Иродова',
    subject: 'Физика',
    deadline: '2025-10-17',
    priority: 'urgent',
    completed: true,
    progress: 100,
    subtasks: [
      { id: 1, text: 'Задача 3.1', completed: true },
      { id: 2, text: 'Задача 3.2', completed: true },
      { id: 3, text: 'Задача 3.3-3.5', completed: true }
    ]
  }
]

export default function HomeworkPage() {
  const router = useRouter()
  const [homework, setHomework] = useState<Homework[]>(initialHomework)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredHomework = homework.filter(hw => {
    if (filter === 'all') return true
    if (filter === 'active') return !hw.completed
    if (filter === 'completed') return hw.completed
    return true
  })

  const toggleSubtask = (homeworkId: number, subtaskId: number) => {
    setHomework(homework.map(hw => {
      if (hw.id === homeworkId) {
        const newSubtasks = hw.subtasks.map(st =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        )
        const completedCount = newSubtasks.filter(st => st.completed).length
        const progress = Math.round((completedCount / newSubtasks.length) * 100)
        const completed = progress === 100

        return { ...hw, subtasks: newSubtasks, progress, completed }
      }
      return hw
    }))
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return '#FF453A'
      case 'important': return '#FFB76B'
      case 'normal': return '#0A84FF'
      default: return '#8E8E93'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'Срочно'
      case 'important': return 'Важно'
      case 'normal': return 'Обычное'
      default: return ''
    }
  }

  const getDaysLeft = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Просрочено'
    if (diffDays === 0) return 'Сегодня'
    if (diffDays === 1) return 'Завтра'
    return `${diffDays} дн.`
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
        <h1 className={styles.title}>Домашние задания</h1>
        <div style={{ width: 40 }} />
      </header>

      {/* Filters */}
      <div className={styles.filters}>
        <motion.button
          className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
          whileTap={{ scale: 0.95 }}
        >
          <span>Все</span>
          <span className={styles.filterCount}>{homework.length}</span>
        </motion.button>
        <motion.button
          className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
          onClick={() => setFilter('active')}
          whileTap={{ scale: 0.95 }}
        >
          <span>Активные</span>
          <span className={styles.filterCount}>{homework.filter(hw => !hw.completed).length}</span>
        </motion.button>
        <motion.button
          className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
          whileTap={{ scale: 0.95 }}
        >
          <span>Выполненные</span>
          <span className={styles.filterCount}>{homework.filter(hw => hw.completed).length}</span>
        </motion.button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {filteredHomework.map((hw, index) => (
          <motion.div
            key={hw.id}
            className={`${styles.homeworkCard} ${hw.completed ? styles.completed : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedHomework(hw)}
          >
            <div className={styles.cardHeader}>
              <div
                className={styles.priorityBadge}
                style={{ background: `${getPriorityColor(hw.priority)}33`, color: getPriorityColor(hw.priority) }}
              >
                {getPriorityLabel(hw.priority)}
              </div>
              <div
                className={styles.deadlineBadge}
                style={{
                  background: getDaysLeft(hw.deadline) === 'Сегодня' || getDaysLeft(hw.deadline) === 'Просрочено'
                    ? 'rgba(255, 69, 58, 0.15)'
                    : 'rgba(142, 142, 147, 0.15)',
                  color: getDaysLeft(hw.deadline) === 'Сегодня' || getDaysLeft(hw.deadline) === 'Просрочено'
                    ? '#FF453A'
                    : '#8E8E93'
                }}
              >
                {getDaysLeft(hw.deadline)}
              </div>
            </div>

            <h3 className={styles.cardTitle}>{hw.title}</h3>
            <p className={styles.cardSubject}>{hw.subject}</p>

            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  style={{
                    width: `${hw.progress}%`,
                    background: hw.completed
                      ? 'linear-gradient(90deg, #30D158 0%, #28a745 100%)'
                      : 'linear-gradient(90deg, #0A84FF 0%, #0066CC 100%)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${hw.progress}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
              </div>
              <span className={styles.progressText}>{hw.progress}%</span>
            </div>

            <div className={styles.subtasksPreview}>
              {hw.subtasks.slice(0, 2).map(subtask => (
                <div key={subtask.id} className={styles.subtaskItem}>
                  <div className={`${styles.checkbox} ${subtask.completed ? styles.checked : ''}`}>
                    {subtask.completed && <span>✓</span>}
                  </div>
                  <span className={subtask.completed ? styles.strikethrough : ''}>{subtask.text}</span>
                </div>
              ))}
              {hw.subtasks.length > 2 && (
                <span className={styles.moreSubtasks}>+{hw.subtasks.length - 2} еще...</span>
              )}
            </div>
          </motion.div>
        ))}

        {filteredHomework.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <h3 className={styles.emptyTitle}>Нет заданий</h3>
            <p className={styles.emptyText}>
              {filter === 'completed'
                ? 'Вы еще не выполнили ни одного задания'
                : 'Добавьте новое задание, нажав кнопку ниже'}
            </p>
          </div>
        )}
      </div>

      {/* FAB */}
      <motion.button
        className={styles.fab}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAddModal(true)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </motion.button>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedHomework && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHomework(null)}
            />
            <div className={styles.modalWrapper}>
              <motion.div
                className={styles.modal}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <div className={styles.modalHeader}>
                  <h2 className={styles.modalTitle}>{selectedHomework.title}</h2>
                  <motion.button
                    className={styles.closeButton}
                    onClick={() => setSelectedHomework(null)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </motion.button>
                </div>

                <div className={styles.modalContent}>
                  <div className={styles.modalInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Предмет:</span>
                      <span className={styles.infoValue}>{selectedHomework.subject}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Дедлайн:</span>
                      <span className={styles.infoValue}>
                        {new Date(selectedHomework.deadline).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Приоритет:</span>
                      <span
                        className={styles.infoBadge}
                        style={{
                          background: `${getPriorityColor(selectedHomework.priority)}33`,
                          color: getPriorityColor(selectedHomework.priority)
                        }}
                      >
                        {getPriorityLabel(selectedHomework.priority)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.subtasksList}>
                    <h3 className={styles.subtasksTitle}>Подзадачи:</h3>
                    {selectedHomework.subtasks.map(subtask => (
                      <motion.div
                        key={subtask.id}
                        className={styles.subtaskItemLarge}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleSubtask(selectedHomework.id, subtask.id)}
                      >
                        <div className={`${styles.checkboxLarge} ${subtask.completed ? styles.checked : ''}`}>
                          {subtask.completed && <span>✓</span>}
                        </div>
                        <span className={subtask.completed ? styles.strikethrough : ''}>{subtask.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className={styles.modalProgress}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${selectedHomework.progress}%`,
                          background: selectedHomework.completed
                            ? 'linear-gradient(90deg, #30D158 0%, #28a745 100%)'
                            : 'linear-gradient(90deg, #0A84FF 0%, #0066CC 100%)'
                        }}
                      />
                    </div>
                    <span className={styles.progressText}>{selectedHomework.progress}% выполнено</span>
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

