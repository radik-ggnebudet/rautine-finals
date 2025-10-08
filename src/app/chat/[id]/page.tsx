'use client'

import { useState, useEffect, useRef, use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './chat.module.css'

interface Message {
  id: number
  text: string
  isMine: boolean
  time: string
}

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatNames: { [key: string]: string } = {
    '1': 'Аревик Хримян',
    '2': 'Карен Хримян',
    '3': 'Эстер Акопян',
    '4': 'Меликсетян Ли'
  }

  const chatColors: { [key: string]: string } = {
    '1': '#8B7FFF',
    '2': '#6B9FFF',
    '3': '#FF6B9F',
    '4': '#FFB76B'
  }

  const chatName = chatNames[resolvedParams.id] || 'Чат'
  const chatColor = chatColors[resolvedParams.id] || '#8B7FFF'

  // Загрузка сообщений из localStorage только на клиенте
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${resolvedParams.id}`)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Начальное сообщение - создаём только на клиенте
      const initialMessages = [
        { id: 1, text: 'Привет! Как дела?', isMine: false, time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) }
      ]
      setMessages(initialMessages)
      localStorage.setItem(`chat_${resolvedParams.id}`, JSON.stringify(initialMessages))
    }
    setIsLoaded(true)
  }, [resolvedParams.id])

  // Автопрокрутка к последнему сообщению
  useEffect(() => {
    if (isLoaded) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoaded])

  // Сохранение сообщений в localStorage
  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem(`chat_${resolvedParams.id}`, JSON.stringify(newMessages))
  }

  const sendMessage = () => {
    if (!inputText.trim()) return

    const currentTime = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

    // Добавляем наше сообщение
    const myMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isMine: true,
      time: currentTime
    }

    const updatedMessages = [...messages, myMessage]
    setMessages(updatedMessages)
    saveMessages(updatedMessages)
    setInputText('')

    // Автоответ через 1 секунду
    setTimeout(() => {
      const replyMessage: Message = {
        id: updatedMessages.length + 1,
        text: 'Привет',
        isMine: false,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }

      const messagesWithReply = [...updatedMessages, replyMessage]
      setMessages(messagesWithReply)
      saveMessages(messagesWithReply)
    }, 1000)
  }

  return (
    <div className={styles.container} suppressHydrationWarning>
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

        <div className={styles.headerInfo}>
          <div className={styles.headerAvatar} style={{ background: chatColor }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="10" r="3" fill="white" fillOpacity="0.9"/>
              <path d="M6 20C6 17 8 15 12 15C16 15 18 17 18 20" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <div>
            <h1 className={styles.headerTitle}>{chatName}</h1>
            <p className={styles.headerStatus}>онлайн</p>
          </div>
        </div>

        <button className={styles.iconButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="white"/>
            <circle cx="12" cy="12" r="1.5" fill="white"/>
            <circle cx="12" cy="18" r="1.5" fill="white"/>
          </svg>
        </button>
      </header>

      {/* Messages */}
      <div className={styles.messagesContainer} suppressHydrationWarning>
        {isLoaded && messages.map((message) => (
          <motion.div
            key={message.id}
            className={`${styles.messageWrapper} ${message.isMine ? styles.myMessage : styles.theirMessage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.messageBubble}>
              <p className={styles.messageText}>{message.text}</p>
              <span className={styles.messageTime}>{message.time}</span>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <motion.button
          className={styles.attachButton}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.button>

        <input
          type="text"
          className={styles.messageInput}
          placeholder="Сообщение"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />

        <motion.button
          className={styles.sendButton}
          onClick={sendMessage}
          whileTap={{ scale: 0.95 }}
          disabled={!inputText.trim()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={inputText.trim() ? '#0A84FF' : '#8E8E93'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </div>
  )
}

