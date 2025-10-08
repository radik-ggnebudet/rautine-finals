# Инструкция по деплою на Vercel

## Быстрый деплой

### Вариант 1: Через Vercel CLI

1. Установите Vercel CLI глобально:
```bash
npm i -g vercel
```

2. Войдите в аккаунт:
```bash
vercel login
```

3. Задеплойте проект:
```bash
vercel
```

4. Для продакшн деплоя:
```bash
vercel --prod
```

### Вариант 2: Через GitHub + Vercel Dashboard

1. Загрузите проект в GitHub репозиторий:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. Зайдите на [vercel.com](https://vercel.com)
3. Нажмите "New Project"
4. Импортируйте ваш GitHub репозиторий
5. Vercel автоматически определит настройки Next.js
6. Нажмите "Deploy"

## Настройки проек��а

Проект уже настроен для деплоя:
- ✅ `next.config.js` создан
- ✅ `vercel.json` создан
- ✅ `.gitignore` обновлен
- ✅ `package.json` содержит правильные версии Node.js
- ✅ `README.md` добавлен

## Переменные окружения

Если потребуется добавить переменные окружения:
1. В Vercel Dashboard → Settings → Environment Variables
2. Добавьте нужные переменные
3. Redeploy проект

## После деплоя

Ваше приложение будет доступно по адресу:
- Production: `https://your-project-name.vercel.app`
- Preview: автоматически для каждой ветки

## Проверка перед деплоем

Локально проверьте сборку:
```bash
npm run build
npm start
```

Приложение откроется на `http://localhost:3000`

