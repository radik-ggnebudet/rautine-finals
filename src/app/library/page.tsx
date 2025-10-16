'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './library.module.css'

interface Book {
  id: number
  title: string
  author: string
  category: 'programming' | 'mathematics' | 'physics' | 'languages' | 'other'
  cover: string
  available: boolean
  borrowedUntil?: string
}

const books: Book[] = [
  { id: 1, title: 'Clean Code', author: 'Robert Martin', category: 'programming', cover: '#0A84FF', available: true },
  { id: 2, title: 'Design Patterns', author: 'Gang of Four', category: 'programming', cover: '#8B7FFF', available: false, borrowedUntil: '2025-10-25' },
  { id: 3, title: 'Introduction to Algorithms', author: 'Cormen, Leiserson', category: 'programming', cover: '#30D158', available: true },
  { id: 4, title: 'Математический анализ', author: 'Фихтенгольц Г.М.', category: 'mathematics', cover: '#FF6B9F', available: true },
  { id: 5, title: 'Линейная алгебра', author: 'Курош А.Г.', category: 'mathematics', cover: '#FFB76B', available: true },
  { id: 6, title: 'Общая физика', author: 'Сивухин Д.В.', category: 'physics', cover: '#C8FF00', available: false, borrowedUntil: '2025-10-20' },
  { id: 7, title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'languages', cover: '#0A84FF', available: true },
  { id: 8, title: 'Python Crash Course', author: 'Eric Matthes', category: 'programming', cover: '#30D158', available: true }
]

const categories = [
  { id: 'all', name: 'Все', icon: '📚' },
  { id: 'programming', name: 'Программирование', icon: '💻' },
  { id: 'mathematics', name: 'Математика', icon: '📐' },
  { id: 'physics', name: 'Физика', icon: '⚛️' },
  { id: 'languages', name: 'Языки', icon: '🌍' },
  { id: 'other', name: 'Другое', icon: '📖' }
]

export default function LibraryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
        <h1 className={styles.title}>Библиотека</h1>
        <button className={styles.iconButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="white" strokeWidth="2"/>
          </svg>
        </button>
      </header>

      {/* Search */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск книг..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button className={styles.clearButton} onClick={() => setSearchQuery('')}>
            ✕
          </button>
        )}
      </div>

      {/* Categories */}
      <div className={styles.categories}>
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            <span className={styles.categoryName}>{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Books List */}
      <div className={styles.content}>
        <div className={styles.booksGrid}>
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              className={styles.bookCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedBook(book)}
            >
              <div className={styles.bookCover} style={{ background: book.cover }}>
                <div className={styles.bookIcon}>📖</div>
              </div>
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>{book.author}</p>
                {book.available ? (
                  <span className={styles.statusBadge} style={{ background: 'rgba(48, 209, 88, 0.2)', color: '#30D158' }}>
                    Доступна
                  </span>
                ) : (
                  <span className={styles.statusBadge} style={{ background: 'rgba(255, 107, 159, 0.2)', color: '#FF6B9F' }}>
                    До {book.borrowedUntil}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h3 className={styles.emptyTitle}>Книги не найдены</h3>
            <p className={styles.emptyText}>Попробуйте изменить запрос или категорию</p>
          </div>
        )}
      </div>
    </div>
  )
}

