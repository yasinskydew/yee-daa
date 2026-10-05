# Учебный план: Next.js — приложение «povarenok» (yee-daa)

## Цель курса

Собрать **рабочее** кулинарное веб-приложение по [макету Figma](https://www.figma.com/design/7m7WovEbnqKau1kpCbOkLP/?node-id=7-2): главная, категории, карточки рецептов, навигация (sidebar / bottom bar), личные разделы — с дизайн-системой и пиксель-перфектом на breakpoint’ах макета (`1920`, `1440`, `768`, `360`).

Стек: Next.js 16, React 19, TypeScript, Tailwind CSS 4, pnpm.

> Сверяйся с локальными гайдами в `node_modules/next/dist/docs/` — в проекте возможны отличия от «классического» Next.

## Формат каждого пункта

1. **Что сделать** — в контексте приложения и дизайна  
2. **Практическое задание** — конкретный deliverable  
3. **Критерии приёмки** — как понять, что пункт закрыт  
4. **Summary** — краткий итог после приёмки (что сделано / вынесено)  
5. Опорные ссылки — в общем разделе [Useful links](#useful-links)

## Итоговый продукт (Definition of Done)

- Визуально совпадает с Figma на `1920` / `1440` / `768` / `360` (главная как минимум; категория и ключевые блоки — в том же языке)
- Есть маршруты: `/home`, `/category/[slug]`, `/recipes/[id]`, `/cookbook`, `/subscriptions`, `/profile` (+ поиск или фильтры)
- UI собран из дизайн-системы (токены + компоненты с variants)
- Данные типизированы; списки/карточки грузятся на сервере; есть loading / error / not-found
- Есть мутация через Server Action (подписка или cookbook)
- `pnpm lint` и `pnpm build` проходят

---

## 1. App Router и структура проекта

**Что сделать.**  
Понять, как из файлов в `app/` получаются URL приложения povarenok. Сейчас есть `/` и заготовка `/home` — это точки входа будущего сайта с рецептами.

**Практическое задание.**
1. Запустить `pnpm dev`
2. Описать своими словами роль `layout.tsx` и `page.tsx`
3. На `/` вывести название продукта (например «povarenok») и ссылку на `/home`
4. На `/home` — заголовок-заглушку страницы главной из макета («Приятного аппетита!» или аналог)

**Критерии приёмки.**
- [ ] `/` и `/home` открываются без ошибок
- [ ] Понятна связь «папка → URL»
- [ ] На `/home` виден осмысленный заголовок главной (не «Hello World»)

**Документация.**  
https://nextjs.org/docs/app/getting-started/project-structure

---

## 2. Platform layout и навигация (shell)

**Что сделать.**  
В макете на desktop слева sidenav (Мои рецепты, Книга рецептов, Подписки, категории…), на mobile — нижний tab bar. Нужен общий shell для всех «внутренних» страниц через route group `(platform)`.

**Практическое задание.**
1. Оформить `app/(platform)/layout.tsx` с областями: sidebar + main (+ слот под bottom nav)
2. Добавить страницы-заглушки: `/home`, `/cookbook`, `/subscriptions`, `/profile`
3. Пункты меню ведут на эти маршруты; активный пункт визуально выделен (пока упрощённо)
4. Route group не должен появляться в URL

**Критерии приёмки.**
- [ ] Переходы по меню работают, URL вида `/cookbook`, не `/(platform)/cookbook`
- [ ] Layout не размонтируется при переходе между разделами (навигация «общая»)
- [ ] На узкой ширине предусмотрен контейнер под bottom nav (хотя бы пустой блок)

**Документация.**  
https://nextjs.org/docs/app/getting-started/layouts-and-pages  
https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

---

## 3. Динамические маршруты: рецепт, категория, блог

**Что сделать.**  
В макете есть карточки рецептов, блоки категорий («Веганская кухня», «Самое сочное») и кулинарные блоги. Для них нужны URL вида `/recipes/123`, `/category/vegan`, `/blogs/42`.

**Практическое задание.**
1. Создать `recipes/[id]`, `category/[slug]`, `blogs/[id]`
2. На каждой странице вывести полученный параметр
3. С главной (пока текстом/ссылками) проставить 2–3 перехода на эти страницы

**Критерии приёмки.**
- [ ] `/recipes/1`, `/category/vegan`, `/blogs/1` рендерятся
- [ ] Параметр отображается на странице
- [ ] Со страницы `/home` можно кликнуть хотя бы в один рецепт и одну категорию

**Документация.**  
https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes

---

## 4. Дизайн-система: токены

**Что сделать.**  
Зафиксировать визуальный язык макета: светлый cream-фон, лаймовый акцент кнопок/акцентов, типографика, сетка отступов, радиусы карточек. Без токенов пиксель-перфект разъедется между экранами.

**Практическое задание.**
1. Снять с Figma: primary/background/text/muted, font families/sizes, spacing scale, radius, shadow
2. Описать токены в `app/globals.css` (CSS variables и/или `@theme` Tailwind 4)
3. Подключить шрифты через `next/font`
4. Применить фон и базовый текст body к приложению

**Критерии приёмки.**
- [ ] В теме есть именованные токены (не только «сырые» hex в компонентах)
- [ ] Фон приложения соответствует макету (cream / светлая тема)
- [ ] Акцентный цвет совпадает с лаймовым из дизайна (± визуально)
- [ ] Шрифт подключен через `next/font`, не системный дефолт браузера

**Документация.**  
https://nextjs.org/docs/app/getting-started/css  
https://nextjs.org/docs/app/api-reference/components/font

---

## 5. Дизайн-система: UI-kit

**Что сделать.**  
Собрать библиотеку компонентов, из которых строится povarenok: Button (primary lime), поля поиска, SelectItem/nav item, RecipeCard (фото, название, рейтинг, время, сложность), чипы категорий, карточка блогера с CTA.

**Практическое задание.**
1. Создать `components/ui/` с базовыми атомами + variants (size/state)
2. Создать продуктовые: `RecipeCard`, `NavItem`, `SectionHeader`, `AuthorCard`
3. (Опционально) страница `/ui` — живой каталог компонентов
4. Запретить «одноразовую» разметку карточки вне `RecipeCard` на следующих экранах

**Критерии приёмки.**
- [x] Есть Button primary/secondary (или эквивалент из макета)
- [x] `RecipeCard` принимает данные через props и совпадает со структурой карточки в Figma
- [x] Nav-элементы переиспользуются в shell (aside + bottom через `AppNav`)
- [x] Компоненты используют токены, а не разрозненные цвета

**Summary.**
- Атомы: `Button` (primary/secondary/ghost, `href`→Link), `Badge`, `Avatar`, `NavItem` — variants + токены.
- Продуктовые: `RecipeCard` (vertical/horizontal), `SectionHeader` (optional action), `AuthorCard` (+ `Avatar`).
- Навигация: меню приложения вынесено в `AppNav` (не SideNav); layout только слоты aside / bottom; `usePathname` только в client-меню.
- Иконки UI — React + `currentColor`; category — raster через `CategoryIcon`.
- Header (поиск/фильтры) ≠ app nav — отдельный UI на п.6.
- Вне скоупа п.5: `/ui`-каталог (опц.), CTA «Подписаться», пиксель home.

Ссылки → [Useful links](#useful-links).

---

## 6. Пиксель-перфект: главная `/home`

**Что сделать.**  
Сверстать главную по фреймам `home page_1920`, `home page_1440`, `home page_768`, `home page_360_all`: приветствие, поиск в шапке, блоки «Новые рецепты», «Самое сочное», «Кулинарные блоги», превью категорий. Desktop — sidebar; mobile — bottom nav.

**Практическое задание.**
1. Собрать `/home` из UI-kit + shell
2. Повторить сетки и отступы для 4 ширин
3. Сверить со скриншотом/фреймом Figma (слои, порядок секций, размеры карточек)
4. Добить расхождения по spacing/typography до визуального совпадения

**Критерии приёмки.**
- [ ] На `1920` и `1440`: sidebar + контент, секции как в макете
- [ ] На `768`: адаптив tablet без поломок сетки
- [ ] На `360`: одна колонка, bottom nav, без горизонтального скролла страницы
- [ ] Порядок секций и ключевые подписи совпадают с дизайном
- [ ] Отклонения по отступам/кеглям в критичных местах ≤ 2px (или осознанно зафиксированы как исключения)

**Документация.**  
https://nextjs.org/docs/app/getting-started/css  
Макет: https://www.figma.com/design/7m7WovEbnqKau1kpCbOkLP/?node-id=7-2

---

## 7. Данные приложения (модели + mock)

**Что сделать.**  
Наполнить приложение содержимым как в дизайне: рецепты с рейтингом/временем/сложностью, категории, авторы блогов. UI должен питаться данными, а не захардкоженным JSX на каждый блок.

**Практическое задание.**
1. Типы: `Recipe`, `Category`, `Author`, `User`
2. Mock-данные (≥ 8 рецептов, ≥ 3 категории, ≥ 3 автора) с полями под карточку макета
3. API-модуль: `getRecipes`, `getRecipeById`, `getCategories`, `getAuthors`, `getRecipesByCategory`
4. Подключить mock к `/home` и `/category/[slug]`

**Критерии приёмки.**
- [ ] На главной карточки рендерятся из массива данных
- [ ] Категория фильтрует рецепты по `slug`
- [ ] Несуществующий рецепт можно будет отловить на следующем шаге (`notFound`)
- [ ] Типы строгие, без `any` в data layer

**Документация.**  
https://nextjs.org/docs/app/getting-started/fetching-data

---

## 8. Async Server Components и загрузка данных

**Что сделать.**  
Главная и карточка рецепта должны получать данные на сервере (как «настоящий» Next-проект), без `useEffect` для первичной загрузки списка.

**Практическое задание.**
1. Сделать data-функции `async` (delay или `fetch` к mock/json)
2. Страницы `/home` и `/recipes/[id]` — `async`
3. На главной параллельно грузить рецепты, категории, авторов (`Promise.all`)

**Критерии приёмки.**
- [ ] Первичный HTML уже содержит карточки (View Source / disable JS — контент на месте)
- [ ] Нет клиентского «спиннера ради списка» через `useEffect` для первой загрузки
- [ ] Страница рецепта показывает данные выбранного id

**Документация.**  
https://nextjs.org/docs/app/getting-started/fetching-data

---

## 9. Loading, error, not-found

**Что сделать.**  
При медленной сети и битых ссылках UX должен быть штатным: скелетон главной/рецепта, ошибка с retry, «рецепт не найден» в стиле приложения.

**Практическое задание.**
1. `loading.tsx` для `(platform)` или для `recipes/[id]` и списка
2. `error.tsx` с восстановлением
3. `notFound()` + `not-found.tsx` для неизвестного рецепта/категории
4. Визуально приблизить состояния к стилю povarenok (токены)

**Критерии приёмки.**
- [ ] При замедлении сети виден loading (можно проверить искусственной задержкой)
- [ ] `/recipes/unknown-id` → not-found, status/поведение корректны
- [ ] Error boundary показывает UI и даёт повторить действие

**Документация.**  
https://nextjs.org/docs/app/api-reference/file-conventions/loading  
https://nextjs.org/docs/app/api-reference/file-conventions/error  
https://nextjs.org/docs/app/api-reference/file-conventions/not-found

---

## 10. Категории: страница + сортировка в URL

**Что сделать.**  
Экраны категории в макете — список рецептов с сортировкой/фильтрами. Состояние сортировки хранить в URL (`?sort=`), чтобы ссылкой можно было поделиться.

**Практическое задание.**
1. Довести `/category/[slug]` до вида списка из дизайна (заголовок категории, сетка карточек)
2. Реализовать `?sort=rating|time|new`
3. UI сортировки меняет query; сервер отдаёт отсортированный список

**Критерии приёмки.**
- [ ] Страница категории визуально в языке макета (карточки, отступы, заголовок)
- [ ] Смена сортировки обновляет URL и порядок карточек
- [ ] Обновление страницы сохраняет выбранный `sort`
- [ ] Неизвестный `slug` → not-found

**Документация.**  
https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional

---

## 11. Поиск и Client Components

**Что сделать.**  
В шапке макета — крупный поиск. Поле ввода интерактивно (client), результаты можно показывать на `/home?q=` или `/search?q=`, фильтрация — на сервере.

**Практическое задание.**
1. Вынести `SearchField` в Client Component
2. Сабмит/debounce пишет `q` в URL
3. Серверная страница фильтрует рецепты по названию
4. Граница client/server: список остаётся Server Component

**Критерии приёмки.**
- [ ] Поиск доступен из shell/шапки как в дизайне
- [ ] `'use client'` только у интерактивного листа, не у всего layout
- [ ] Результаты соответствуют запросу; пустой ввод показывает обычную главную/полный список

**Документация.**  
https://nextjs.org/docs/app/getting-started/server-and-client-components

---

## 12. `next/image` для фото рецептов

**Что сделать.**  
Карточки и страница рецепта в макете завязаны на фото блюд. Подключить `next/image` для оптимизации и стабильной вёрстки (без скачков layout).

**Практическое задание.**
1. Все фото рецептов/аватаров авторов — через `Image`
2. Настроить `remotePatterns`, если картинки внешние
3. Корректные `alt`, размеры/`fill` + `sizes` под сетку карточек

**Критерии приёмки.**
- [ ] Нет «сырых» `<img>` в карточках рецептов
- [ ] Карточки не прыгают при загрузке изображений
- [ ] Сборка не падает из-за доменов картинок

**Документация.**  
https://nextjs.org/docs/app/api-reference/components/image

---

## 13. Metadata и SEO

**Что сделать.**  
У приложения и страниц рецептов должны быть человекочитаемые title/description (и базовый OG), как у публичного кулинарного сайта.

**Практическое задание.**
1. Корневой/platform `metadata` — бренд povarenok
2. `generateMetadata` для рецепта (название блюда) и категории
3. Проверить title во вкладке браузера

**Критерии приёмки.**
- [ ] `/recipes/[id]` → title содержит название рецепта
- [ ] `/category/[slug]` → title содержит название категории
- [ ] Дефолтный title не остаётся `Create Next App`

**Документация.**  
https://nextjs.org/docs/app/getting-started/metadata-and-og-images

---

## 14. Server Actions: подписки и cookbook

**Что сделать.**  
В макете есть «Подписаться» у блогеров и сохранение рецептов (книжка/сердце). Реализовать мутации через Server Actions и обновление UI после действия.

**Практическое задание.**
1. Actions: `subscribeToAuthor`, `toggleSaveRecipe` (и при желании упрощённый `createRecipe`)
2. Формы/кнопки на карточках автора и рецепта
3. Хранение — in-memory/file/cookie mock OK для учёбы
4. `revalidatePath` после мутации

**Критерии приёмки.**
- [ ] Кнопка подписки меняет состояние и отражается в `/subscriptions`
- [ ] Сохранённый рецепт появляется в `/cookbook`
- [ ] После действия данные обновляются без ручного перезапуска сервера
- [ ] Есть базовая серверная валидация id

**Документация.**  
https://nextjs.org/docs/app/getting-started/mutating-data  
https://nextjs.org/docs/app/api-reference/functions/revalidatePath

---

## 15. Пиксель-перфект: остальные ключевые экраны

**Что сделать.**  
Довести до дизайна не только home: категория, карточка рецепта (если есть в файле), состояния shell на всех breakpoint’ах, личные разделы в том же UI-языке.

**Практическое задание.**
1. Сверить `/category/[slug]` с макетом списков
2. Сверстать `/recipes/[id]` (состав/описание/мета — по доступным фреймам или согласованной структуре карточки)
3. `/cookbook`, `/subscriptions`, `/profile` — empty и filled состояния в стиле DS
4. Финальный проход 1920 → 360 по чеклисту визуального QA

**Критерии приёмки.**
- [ ] Все основные маршруты выглядят как части одного продукта
- [ ] Нет «выпадающих» шрифтов/цветов вне токенов
- [ ] Mobile: bottom nav на всех platform-страницах, desktop: sidebar
- [ ] Визуальный QA пройден по чеклисту DoD

**Документация.**  
https://nextjs.org/docs/app/getting-started/css  
Макет: https://www.figma.com/design/7m7WovEbnqKau1kpCbOkLP/?node-id=7-2

---

## 16. Auth-заглушка и персональные разделы

**Что сделать.**  
«Мои рецепты», cookbook, subscriptions, profile в sidenav — персональный контур. Нужна учебная сессия (cookie/mock user), чтобы разделы показывали данные текущего пользователя.

**Практическое задание.**
1. Mock login/logout (cookie `userId`)
2. Привязать saves/subscriptions к пользователю
3. Опционально: `middleware` на `/profile` и личные страницы

**Критерии приёмки.**
- [ ] Без «входа» личный раздел показывает guest-состояние или редирект (зафиксировать одно поведение)
- [ ] После входа cookbook/subscriptions показывают данные пользователя
- [ ] Logout очищает персональный контекст

**Документация.**  
https://nextjs.org/docs/app/building-your-application/authentication  
https://nextjs.org/docs/app/api-reference/file-conventions/middleware

---

## 17. Route Handlers (сравнение подходов)

**Что сделать.**  
Добавить HTTP API для рецептов и один раз сравнить с прямым вызовом data layer из Server Component — чтобы понимать, когда нужен `app/api`.

**Практическое задание.**
1. `GET /api/recipes`, `GET /api/recipes/[id]`, `POST /api/recipes`
2. Временно перевести один экран на `fetch` своего API
3. Кратко зафиксировать в комментарии/заметке плюсы/минусы vs прямой data layer

**Критерии приёмки.**
- [ ] API отвечает JSON и покрывает list/detail/create
- [ ] Экран на API работает
- [ ] В проекте остаётся понимание: UI по умолчанию ходит в data layer, API — для внешних клиентов

**Документация.**  
https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

---

## 18. Финальная сборка и приёмка приложения

**Что сделать.**  
Закрыть курс рабочим приложением: стабильная сборка, проход по DoD, сверка с Figma.

**Практическое задание.**
1. `pnpm lint` / `pnpm build` — исправить ошибки
2. Пройти пользовательский сценарий ниже
3. Пройти визуальный QA по breakpoint’ам
4. (Опционально) деплой на Vercel

**Пользовательский сценарий приёмки.**
1. Открыть `/home` → увидеть секции как в макете  
2. Найти рецепт поиском → открыть карточку  
3. Открыть категорию → сменить сортировку → порядок меняется  
4. Подписаться на автора → увидеть в `/subscriptions`  
5. Сохранить рецепт → увидеть в `/cookbook`  
6. Проверить `360` и `1920` — навигация и сетка корректны  

**Критерии приёмки.**
- [ ] Все пункты Definition of Done отмечены
- [ ] Сценарий выше проходит без ошибок в консоли
- [ ] `pnpm build` успешен
- [ ] Расхождения с Figma зафиксированы списком (если остались) или отсутствуют

**Документация.**  
https://nextjs.org/docs/app/getting-started/deploying  
https://nextjs.org/docs/app/api-reference/cli/next

---

## Вне скоупа (бонус)

- Прод-БД (Postgres и т.п.)
- Реальный OAuth/NextAuth в проде
- E2E-тесты на Playwright (желательно после стабилизации UI)

---

## Разбор ошибок (UI-kit / токены)

Ошибки из практики пунктов 4–5. Сверяй перед приёмкой новых компонентов.

### Токены и темы

| Ошибка | Почему плохо | Как правильно |
|---|---|---|
| `--primary-foreground` только в `html.dark`, нет в `:root` | В light `text-primary-foreground` может не работать | Задавать парные токены и в light, и в dark |
| Primary-кнопка: `text-foreground` | В dark `foreground` светлый → лайм + белый текст, плохой контраст | `text-primary-foreground` (обычно `#000` на лайме в обеих темах) |
| Путать `foreground` и `*-foreground` | `foreground` = текст **страницы**; `primary-foreground` = текст **на** primary | Семантика: цвет поверхности + цвет контента на ней |
| Badge с `bg-primary` как у Button | В макете чип = soft lime (`Lime/150`), не CTA | Badge primary → `bg-primary-soft` |

### Компоненты и API

| Ошибка | Почему плохо | Как правильно |
|---|---|---|
| `{...props}` внутри `clsx(...)` / `className` | `onClick`/`disabled` не попадают на DOM; className ломается | `className={clsx(...)}` отдельно, `{...props}` на элементе |
| Тип `ButtonHTMLAttributes`, рендер `<span>` / `<div>` | Ложь в типах, лишние button-пропсы | Тип = элемент: `HTMLAttributes<HTMLSpanElement>` для Badge |
| `disabled:*` на неинтерактивном `span` | Стили не к чему привязать | Либо не тянуть disabled, либо делать реальный `button` |
| Имя файла `budge` / компонент `Budge` | Путаница в импортах и ревью | `badge.tsx` → `Badge` |
| Badge с `h-10` как у Button | Чип становится «кнопкой» по высоте | Высота по контенту: `px`/`py`, без фиксированного `h-*` (если макет не требует) |
| Зашивать ширину кнопки под один фрейм Figma (`w-[197px]`) | Ломается на другом тексте/языке | В UI-kit: высота + padding; ширину (`w-full` / `flex-1`) — с места вызова |

### SectionHeader / Button-as-Link / иконки

| Ошибка | Почему плохо | Как правильно |
|---|---|---|
| `action.href` в props, но рендер `<button>` без ссылки | CTA секции не навигирует | `Button` с `href` → `Link`, или настоящий `asChild` + `<Link>` |
| `asChild` + `href` в одном API без Slot | Это не Radix-asChild; путаница в типах | Либо `href?: string` → Link, либо `asChild` + `@radix-ui/react-slot` |
| `import { Url } from "url"` для href | Node `Url`, не путь Next | `href?: string` |
| `asChild: boolean` обязательный | Ломает все `<Button>` без пропа | `asChild?: boolean` / не смешивать с href-режимом |
| Дублировать `className` у `button` и `Link` | Расхождения стилей | Одна переменная `classes = clsx(...)` |
| `'text-foreground, font-medium'` (запятая в строке) | Класс с запятой не существует | `'text-foreground font-medium'` |
| `leadming-8`, `xl:text:5xl` | Опечатки → стили не применяются | `leading-8`, `xl:text-5xl` |
| Скопировать `path` из другой иконки (bookmark → arrow) | Неверная графика | Брать `d` из своего SVG (`bs-arrow-right.svg`) |
| `fill="black"` в React-иконке | Не следует за темой/кнопкой | `fill="currentColor"` |
| SVG в Cursor открыт как превью | Не видно `path` | Open With… → Text Editor |

### Паттерн «не повторять»

1. Сверил Figma → токен уже есть? используй; нет и reused → в `globals.css`.
2. Props + `clsx` (база → size → variant → `className`).
3. Native/`HTMLAttributes` совпадают с тегом.
4. Проверил **light и dark**.
5. Показан хотя бы на одной странице (например `/subscriptions` или `/ui`).

### Шпаргалка токенов для кнопок/чипов

```txt
bg-primary + text-primary-foreground     → Button primary
bg-foreground + text-background          → Button secondary (или завести secondary/secondary-foreground)
bg-transparent + border-border           → Button ghost
bg-primary-soft + text-primary-foreground → Badge (категория)
```

---

## Useful links

### App Router / структура
- https://nextjs.org/docs/app/getting-started/project-structure
- https://nextjs.org/docs/app/getting-started/layouts-and-pages
- https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
- https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes

### Server / Client
- https://nextjs.org/docs/app/getting-started/server-and-client-components
- https://nextjs.org/docs/app/api-reference/functions/use-pathname
- https://dev.to/hongster85/hydration-in-reactnextjs-understand-in-3-minutes-3917

### Стили и шрифты
- https://nextjs.org/docs/app/getting-started/css
- https://nextjs.org/docs/app/api-reference/components/font
- https://tailwindcss.com/docs/theme
- https://tailwindcss.com/docs/responsive-design

### UI-kit / компоненты (п.5)
- https://nextjs.org/docs/app/api-reference/components/link
- https://nextjs.org/docs/app/api-reference/components/image
- https://nextjs.org/docs/app/getting-started/images-and-fonts

### Тема (light/dark)
- https://github.com/pacocoursey/next-themes

### Макет
- https://www.figma.com/design/7m7WovEbnqKau1kpCbOkLP/?node-id=7-2
