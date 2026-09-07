# Void Dominion — сайт-визитка

Лендинг для игры [**Void Dominion**](https://github.com/Moonwuk/MoonGame) — real-time
космической grand strategy с массовым мультиплеером. Тёмный космический стиль игры,
кинематографичный hero-блок с лёгким движением поверхности планеты и адаптивная вёрстка.

## Лендинг: https://moongametechnology.github.io/VoidDomoninSite/

## Сайт: [https://moonwuk.github.io/MoonGame/](https://moonwuk.github.io/MoonGame/)

## Стек

- **Vite** + **React** + **TypeScript**
- **framer-motion** — анимации появления секций
- Палитра и типографика зеркалят тему прототипа (cyan `#35d6e6` на тёмном космосе)

## Разработка

```bash
npm install
npm run dev      # локальный dev-сервер
npm run build    # прод-сборка в dist/
npm run preview  # предпросмотр сборки
npm run lint     # oxlint
```

Требуется Node >= 20 (проверено на 22).

## Доступность

- Полностью адаптивный layout (desktop / планшет / мобайл).
- `prefers-reduced-motion` отключает анимации для чувствительных пользователей.
- Движение hero рендерится в фоне и не блокирует контент.

## Деплой

Настроен GitHub Pages через `.github/workflows/deploy.yml`. Для project-site путь
задаётся переменной `VITE_BASE` (`/<repo>/`). Включите Pages в настройках репозитория
(Source: GitHub Actions).

---

Оригинальная игра — код, контент и механики. Жанр взят как вдохновение, но это не копия.
