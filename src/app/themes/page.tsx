'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import styles from './themes.module.css'

const themes = [
  { id: 'dark' as const, name: 'Темная', description: 'Классическая темная тема', bg: '#000000', card: '#1C1C1E', text: '#FFFFFF' },
  { id: 'light' as const, name: 'Светлая', description: 'Комфортная для дневного использования', bg: '#FFFFFF', card: '#F2F2F7', text: '#000000' },
  { id: 'amoled' as const, name: 'AMOLED', description: 'Абсолютно черный фон', bg: '#000000', card: '#0A0A0A', text: '#FFFFFF' }
]

const accentColors = [
  { id: 'blue' as const, name: 'Синий', color: '#0A84FF', gradient: 'linear-gradient(135deg, #0A84FF 0%, #0066CC 100%)' },
  { id: 'green' as const, name: 'Зеленый', color: '#30D158', gradient: 'linear-gradient(135deg, #30D158 0%, #28a745 100%)' },
  { id: 'purple' as const, name: 'Фиолетовый', color: '#8B7FFF', gradient: 'linear-gradient(135deg, #8B7FFF 0%, #6B5FDF 100%)' },
  { id: 'pink' as const, name: 'Розовый', color: '#FF6B9F', gradient: 'linear-gradient(135deg, #FF6B9F 0%, #FF4585 100%)' },
  { id: 'orange' as const, name: 'Оранжевый', color: '#FFB76B', gradient: 'linear-gradient(135deg, #FFB76B 0%, #FF9F4A 100%)' }
]

export default function ThemesPage() {
  const router = useRouter()
  const { theme, accentColor, setTheme, setAccentColor } = useTheme()

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
        <h1 className={styles.title}>Темы оформления</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className={styles.content}>
        {/* Theme Selection */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎨 Основная тема</h2>
          <div className={styles.themesGrid}>
            {themes.map((themeItem, index) => (
              <motion.div
                key={themeItem.id}
                className={`${styles.themeCard} ${theme === themeItem.id ? styles.active : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(themeItem.id)}
              >
                <div className={styles.themePreview} style={{ background: themeItem.bg }}>
                  <div className={styles.previewHeader} style={{ background: themeItem.card }}>
                    <div className={styles.previewDot} />
                    <div className={styles.previewDot} />
                    <div className={styles.previewDot} />
                  </div>
                  <div className={styles.previewContent}>
                    <div className={styles.previewCard} style={{ background: themeItem.card }} />
                    <div className={styles.previewCard} style={{ background: themeItem.card }} />
                  </div>
                </div>
                <div className={styles.themeInfo}>
                  <h3 className={styles.themeName}>{themeItem.name}</h3>
                  <p className={styles.themeDescription}>{themeItem.description}</p>
                </div>
                {theme === themeItem.id && (
                  <div className={styles.activeCheck}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Accent Colors */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🌈 Акцентный цвет</h2>
          <div className={styles.colorsGrid}>
            {accentColors.map((color, index) => (
              <motion.div
                key={color.id}
                className={`${styles.colorCard} ${accentColor === color.id ? styles.active : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAccentColor(color.id)}
              >
                <div
                  className={styles.colorCircle}
                  style={{ background: color.gradient }}
                />
                <span className={styles.colorName}>{color.name}</span>
                {accentColor === color.id && (
                  <div className={styles.activeCheck}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Preview Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👀 Предпросмотр</h2>
          <div className={styles.previewSection}>
            <div className={styles.previewExample}>
              <div className={styles.exampleHeader}>
                <div className={styles.exampleAvatar} />
                <div className={styles.exampleText}>
                  <div className={styles.exampleTitle} />
                  <div className={styles.exampleSubtitle} />
                </div>
              </div>
              <div className={styles.exampleCard}>
                <div className={styles.exampleCardHeader} />
                <div className={styles.exampleCardContent} />
              </div>
              <div className={styles.exampleButtons}>
                <div className={styles.exampleButton} style={{ background: accentColors.find(c => c.id === accentColor)?.gradient }} />
                <div className={styles.exampleButton} style={{ background: 'rgba(255, 255, 255, 0.05)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Info */}
        <div className={styles.infoBox}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#0A84FF" strokeWidth="2"/>
            <path d="M10 14V10M10 6V6.5" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className={styles.infoText}>
            Изменения применятся сразу после выбора темы
          </p>
        </div>
      </div>
    </div>
  )
}

