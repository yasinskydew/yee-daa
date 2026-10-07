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
- Есть маршруты: `/home` (`?cat=` / `?sub=` для категорий), `/juicy` («Самое сочное»), `/recipes/[id]`, `/cookbook`, `/subscriptions`, `/profile` (+ поиск или фильтры)
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
[https://nextjs.org/docs/app/getting-started/project-structure](https://nextjs.org/docs/app/getting-started/project-structure)

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
[https://nextjs.org/docs/app/getting-started/layouts-and-pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)  
[https://nextjs.org/docs/app/api-reference/file-conventions/route-groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)

---



## 3. Динамические маршруты: рецепт, блог; категории на главной

**Что сделать.**  
Категории из sidenav **не отдельная страница**: фильтр главной (`/home` + карусель). Отдельный экран — «Самое сочное». Рецепты и блоги — динамические URL.

**Практическое задание.**

1. Создать `recipes/[id]`, `blogs/[id]`, заглушку `/juicy`
2. Категории: `/home?cat=vegan` и `/home?cat=vegan&sub=vegan-mains` (не `/category/...`)
3. С sidenav проставить переходы; крошки: `Главная › Веганская кухня › Вторые блюда`

**Критерии приёмки.**

- [ ] `/recipes/1`, `/blogs/1`, `/juicy` рендерятся
- [ ] Клик по категории остаётся на `/home` с query
- [ ] Breadcrumbs не содержат сегмент `category`

**Документация.**  
[https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)

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
[https://nextjs.org/docs/app/getting-started/css](https://nextjs.org/docs/app/getting-started/css)  
[https://nextjs.org/docs/app/api-reference/components/font](https://nextjs.org/docs/app/api-reference/components/font)

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

- Структура UI: `app/ui/primitives/` (атомы) + `app/ui/composites/` (продуктовые) + `icons/` + shell-меню.
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

- [x] На `1920` и `1440`: sidebar + контент, секции как в макете
- [x] На `768`: адаптив tablet без поломок сетки
- [x] На `360`: одна колонка, bottom nav, без горизонтального скролла страницы
- [x] Порядок секций и ключевые подписи совпадают с дизайном
- [x] Отклонения по отступам/кеглям в критичных местах ≤ 2px (или осознанно зафиксированы как исключения)

**Роадмап реализации.**  
Данные (типы/API) — п.7. На п.6 моки в `page` или локальный `home-mocks.ts`.


| Фаза | Фокус                 | Deliverable                                                                                                                    |
| ---- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 0    | Shell (layout)        | `aside` (~256) + `main` + sticky bottom; отступы; `AppNav` vertical/horizontal; нет гориз. скролла на 360                      |
| 1    | Каркас секций `/home` | Порядок: приветствие → Новые рецепты → Самое сочное → Кулинарные блоги → превью категории; `SectionHeader` + 1–2 мок-карточки  |
| 2    | Сетки + карусель      | Новые: `RecipeCarousel` + `vertical` cards; Сочное: `horizontal` `grid-cols-2→1`; Блоги: `grid-cols-3→1`; gap снаружи карточек |
| 3    | Header home           | h1 «Приятного аппетита!»; `SearchInput` (можно non-functional); фильтры — заглушка; ≠ `AppNav`                                 |
| 4    | Пиксель               | Проход 1920 → 1440 → 768 → 360; кегли/gap/размеры карточек; ≤2px или исключение в «Разбор ошибок»                              |
| 5    | Полировка             | dark; `href` секций на заглушки маршрутов; убрать/оставить playground на `/subscriptions`                                      |


Порядок файлов: фаза 0 → `layout` / `app-nav`; 1–2 → `home/page` + моки + `recipe-carousel`; 3 → primitive search; 4 → только spacing/typography.

**Вне скоупа п.6:** живой поиск, API/типы (п.7). Карусель «Новые рецепты» со стрелками — **в скоупе** (см. ниже).

### Shell: независимый scroll (CategoryNav ≠ FooterLeft)

Макет: при раскрытии accordion список категорий **скроллится внутри колонки**, блок версии / копирайта / «Выйти» (`FooterLeft`) **остаётся внизу** и не уезжает вместе с пунктами. То же в desktop `aside` и в mobile drawer.

#### Почему ломается

Flex-элемент по умолчанию имеет `min-height: auto` = высота контента. Accordion раскрылся → `aside` вырос → страница стала выше → футер уехал вниз, скроллится **всё окно**, а не nav.

`overflow-y-auto` на родителе **вместе** с nav и footer тоже плохо: футер уходит в ту же прокрутку.

`flex-1` на nav **не работает**, пока у колонки нет **ограниченной высоты** (не `min-h-dvh`, а `h-dvh` / высота флекс-ребёнка с `min-h-0`).

#### Правильная схема (три слоя)

```
shell          h-dvh flex-col overflow-hidden     ← высота = viewport, наружу не растём
  Header       shrink-0
  body row     flex-1 min-h-0 overflow-hidden     ← забирает остаток экрана
    aside      flex-col min-h-0 overflow-hidden w-64
      nav wrap flex-1 min-h-0 overflow-y-auto     ← ЕДИНСТВЕННЫЙ вертикальный scroll меню
        CategoryNav
      FooterLeft  shrink-0                       ← всегда виден
    main       flex-1 min-h-0 overflow-y-auto    ← скролл контента страницы отдельно
```

Классы-якоря:


| Слой        | Обязательные классы                            | Зачем                                            |
| ----------- | ---------------------------------------------- | ------------------------------------------------ |
| shell       | `h-dvh overflow-hidden`                        | не `min-h-dvh`: иначе колонка растёт с accordion |
| ряд body    | `flex-1 min-h-0 overflow-hidden`               | `min-h-0` снимает `min-height: auto`             |
| aside       | `flex flex-col min-h-0 overflow-hidden`        | высота = ряд, дети делят её                      |
| обёртка nav | `flex-1 min-h-0 overflow-y-auto`               | скролл **только** категорий                      |
| FooterLeft  | `shrink-0` (не класть в overflow-y-auto aside) | прибит к низу колонки                            |
| main        | `flex-1 min-h-0 overflow-y-auto`               | длинная главная не двигает сайдбар               |


`overflow-y-auto` вешать **не** на `aside` целиком и **не** на `CategoryNav` как единственный flex-ребёнок без обёртки: `Suspense` — промежуточный узел, `flex-1` должен быть на обёртке-ребёнке `aside`.

#### Mobile drawer (`MobileMenu`)

Та же нарезка внутри панели (`overflow-hidden` + колонка):

1. header (`bg-header` + Logo) — `shrink-0`
2. обёртка `CategoryNav` — `flex-1 min-h-0 overflow-y-auto`
3. `FooterLeft` — `shrink-0`

Backdrop / `fixed inset-0` задаёт высоту панели (`inset-y-0`). Скролл появляется, когда раскрытый accordion не влезает между шапкой и футером.

#### Чеклист

- [ ] Раскрытие «Заготовки» / «Веганская кухня» → скроллбар у списка, футер на месте  
- [ ] Страница `/home` скроллится в `main`, сайдбар не едет  
- [ ] Mobile burger: то же поведение внутри drawer  



### Правый рейл: CTA «Записать рецепт»

Уникальный контрол (круг + glow + подпись), **не** variant `Button`.

- Файл: `app/ui/composites/write-recipe-cta.tsx`
- Иконка: `PencilSquareIcon`, `fill="currentColor"`, цвет на круге — `text-header`
- Круг: `rounded-full bg-primary-foreground` (чёрный в обеих темах); иконка `text-header`; свечение — `radial-gradient` с `--primary` на обёртке
- Маршрут: `Link` на заглушку `/recipes/new` (`recipes/new` выше `recipes/[id]`)
- Слот: правый `aside` (`w-[208px]`), под `UserNotifications`, `mt-auto`; только `md+`
- Не смешивать со счётчиками и не расширять UI-kit Button
- Живой create — п.14



### Карусель «Новые рецепты» (`RecipeCarousel`)

Макет (`home page_*` → `new recipes`): заголовок + горизонтальный ряд `RecipeCard` (vertical, ~322px) + стрелки 48×48 по краям. На узких экранах видно 1–2 карточки, на широких — больше; остальное уезжает в горизонтальный scroll **внутри** секции, не всей страницы.

#### Файлы


| Файл                                              | Роль                                                    |
| ------------------------------------------------- | ------------------------------------------------------- |
| `app/ui/composites/recipe-carousel.tsx`           | Client: scroller + стрелки + состояние краёв            |
| `app/ui/composites/new-recipes-section.tsx`       | Секция: `SectionHeader` + `RecipeCarousel` + map моков  |
| `app/data/home-mocks.ts`                          | `NEW_RECIPES` (≥ 8 штук, чтобы overflow был на desktop) |
| `app/ui/icons/arrow-left.tsx` / `arrow-right.tsx` | Иконки из Figma, `currentColor`                         |




#### Архитектура

```
NewRecipesSection          server OK
  SectionHeader
  RecipeCarousel           'use client'
    ul[ref] overflow-x-auto snap-x   ← единственный горизонтальный scroll
      li[data-carousel-item]         ← ширина карточки + gap = шаг
    overlay absolute                 ← стрелки; pointer-events-none на слое
      button prev / next             ← pointer-events-auto
```

Стрелки **не** двигают transform и **не** режут DOM на «страницы». Они вызывают `scrollBy({ left: ±step, behavior: 'smooth' })`, где `step = offsetWidth(первой li) + gap (24)`.

#### Почему ломается overflow

Flex-ребёнок по умолчанию `min-width: auto` = ширина контента. Ряд карточек с `shrink-0` раздувает предков → `scrollWidth === clientWidth` → скролла нет, стрелка «вперёд» бесполезна, едет вся страница.

Цепочка обязана сжиматься:

```
main / page / section / carousel wrap / ul
  → везде min-w-0 (и w-full где нужно)
ul → overflow-x-auto
li → shrink-0 w-[min(100%,322px)] snap-start
```



#### Состояние стрелок

1. `maxScroll = scrollWidth - clientWidth`
2. `canPrev = scrollLeft > ε`
3. `canNext = maxScroll > ε && scrollLeft < maxScroll - ε`
4. Слой стрелок рендерить только если `canPrev || canNext` (нет overflow — нет кнопок)
5. На краю соответствующая кнопка `disabled`

Пересчёт:

- `useLayoutEffect` после children (первый paint)
- `scroll` на `ul` (passive)
- `ResizeObserver` на `ul` **и** на каждый `li` (ширина карточки / viewport)
- `window.resize`
- логику обновления удобно держать в `useEffectEvent`, чтобы не плодить stale closures в listeners



#### UX / a11y

- Скрытый scrollbar: `scrollbar-width: none` + webkit
- `snap-x snap-mandatory` + `snap-start` на item — выравнивание после свайпа
- `tabIndex={0}` на `ul`, `ArrowLeft` / `ArrowRight` на клавиатуре
- `aria-label` на списке и на кнопках («Предыдущие / Следующие рецепты»)
- Кнопки: `size-12`, `rounded-[var(--radius-md)]`, `bg-foreground text-header` (как чёрная кнопка + cream-иконка в макете); слой `-inset-x-2`, по вертикали по центру ряда



#### Чеклист

- [ ] 1920 / 1440: видно несколько карточек, стрелка вправо; влево скрыта/disabled у старта  
- [ ] После клика «вперёд» появляется «назад»; у конца — «вперёд» disabled  
- [ ] 768 / 360: 1–2 карточки, свайп и стрелки работают, **нет** горизонтального скролла всей страницы  
- [ ] Resize окна пересчитывает `canPrev` / `canNext`  
- [ ] Клавиатура ←/→ при фокусе на списке  

Ссылки → [Useful links](#useful-links).

---



## 7. Данные приложения (модели + mock)

**Что сделать.**  
Наполнить приложение содержимым как в дизайне: рецепты с рейтингом/временем/сложностью, категории, авторы блогов. UI должен питаться данными, а не захардкоженным JSX на каждый блок.

**Практическое задание.**

1. Типы: `Recipe`, `Category`, `Author`, `User`
2. Mock-данные (≥ 8 рецептов, ≥ 3 категории, ≥ 3 автора) с полями под карточку макета
3. API-модуль: `getRecipes`, `getRecipeById`, `getCategories`, `getAuthors`, `getRecipesByCategory`
4. Подключить mock к `/home` (фильтр `?cat=` / `?sub=`) и `/juicy`

**Критерии приёмки.**

- [ ] На главной карточки рендерятся из массива данных
- [ ] Категория фильтрует рецепты по `slug`
- [ ] Несуществующий рецепт можно будет отловить на следующем шаге (`notFound`)
- [ ] Типы строгие, без `any` в data layer

**Документация.**  
[https://nextjs.org/docs/app/getting-started/fetching-data](https://nextjs.org/docs/app/getting-started/fetching-data)

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
[https://nextjs.org/docs/app/getting-started/fetching-data](https://nextjs.org/docs/app/getting-started/fetching-data)

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
[https://nextjs.org/docs/app/api-reference/file-conventions/loading](https://nextjs.org/docs/app/api-reference/file-conventions/loading)  
[https://nextjs.org/docs/app/api-reference/file-conventions/error](https://nextjs.org/docs/app/api-reference/file-conventions/error)  
[https://nextjs.org/docs/app/api-reference/file-conventions/not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)

---



## 10. Категории на `/home` + сортировка в URL

**Что сделать.**  
Фильтр категории — состояние главной, не отдельный route. Сортировку хранить в URL (`?sort=`).

**Практическое задание.**

1. `/home?cat=&sub=` фильтрует карусель/список на главной
2. Реализовать `?sort=rating|time|new` (на главной и/или `/juicy`)
3. UI сортировки меняет query; сервер отдаёт отсортированный список
4. Крошки из данных: Главная › parent › child

**Критерии приёмки.**

- [ ] Смена категории не уводит с `/home`
- [ ] Смена сортировки обновляет URL и порядок карточек
- [ ] Обновление страницы сохраняет `cat` / `sub` / `sort`
- [ ] Неизвестный `cat`/`sub` → not-found или сброс на `/home` (зафиксировать одно)

**Документация.**  
[https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional)

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
[https://nextjs.org/docs/app/getting-started/server-and-client-components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

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
[https://nextjs.org/docs/app/api-reference/components/image](https://nextjs.org/docs/app/api-reference/components/image)

---



## 13. Metadata и SEO

**Что сделать.**  
У приложения и страниц рецептов должны быть человекочитаемые title/description (и базовый OG), как у публичного кулинарного сайта.

**Практическое задание.**

1. Корневой/platform `metadata` — бренд povarenok
2. `generateMetadata` для рецепта, `/home` с `?cat=` и `/juicy`
3. Проверить title во вкладке браузера

**Критерии приёмки.**

- [ ] `/recipes/[id]` → title содержит название рецепта
- [ ] `/home?cat=vegan` → title содержит название категории
- [ ] Дефолтный title не остаётся `Create Next App`

**Документация.**  
[https://nextjs.org/docs/app/getting-started/metadata-and-og-images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

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
[https://nextjs.org/docs/app/getting-started/mutating-data](https://nextjs.org/docs/app/getting-started/mutating-data)  
[https://nextjs.org/docs/app/api-reference/functions/revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

---



## 15. Пиксель-перфект: остальные ключевые экраны

**Что сделать.**  
Довести до дизайна не только дефолтную главную: фильтр категории на `/home`, `/juicy`, карточка рецепта, shell на всех breakpoint’ах, личные разделы.

**Практическое задание.**

1. Сверить `/home?cat=` с макетом ленты/карусели категории
2. Сверстать `/juicy` и `/recipes/[id]` по доступным фреймам
3. `/cookbook`, `/subscriptions`, `/profile` — empty и filled состояния в стиле DS
4. Финальный проход 1920 → 360 по чеклисту визуального QA

**Критерии приёмки.**

- [ ] Все основные маршруты выглядят как части одного продукта
- [ ] Нет «выпадающих» шрифтов/цветов вне токенов
- [ ] Mobile: bottom nav на всех platform-страницах, desktop: sidebar
- [ ] Визуальный QA пройден по чеклисту DoD

**Документация.**  
[https://nextjs.org/docs/app/getting-started/css](https://nextjs.org/docs/app/getting-started/css)  
Макет: [https://www.figma.com/design/7m7WovEbnqKau1kpCbOkLP/?node-id=7-2](https://www.figma.com/design/7m7WovEbnqKau1kpCbOkLP/?node-id=7-2)

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
[https://nextjs.org/docs/app/building-your-application/authentication](https://nextjs.org/docs/app/building-your-application/authentication)  
[https://nextjs.org/docs/app/api-reference/file-conventions/middleware](https://nextjs.org/docs/app/api-reference/file-conventions/middleware)

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
[https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware](https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware)

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
3. Выбрать категорию в sidenav → `/home?cat=`, крошки `Главная › …`; сменить сортировку → порядок меняется
4. Подписаться на автора → увидеть в `/subscriptions`
5. Сохранить рецепт → увидеть в `/cookbook`
6. Проверить `360` и `1920` — навигация и сетка корректны

**Критерии приёмки.**

- [ ] Все пункты Definition of Done отмечены
- [ ] Сценарий выше проходит без ошибок в консоли
- [ ] `pnpm build` успешен
- [ ] Расхождения с Figma зафиксированы списком (если остались) или отсутствуют

**Документация.**  
[https://nextjs.org/docs/app/getting-started/deploying](https://nextjs.org/docs/app/getting-started/deploying)  
[https://nextjs.org/docs/app/api-reference/cli/next](https://nextjs.org/docs/app/api-reference/cli/next)

---



## Вне скоупа (бонус)

- Прод-БД (Postgres и т.п.)
- Реальный OAuth/NextAuth в проде
- E2E-тесты на Playwright (желательно после стабилизации UI)

---



## Разбор ошибок (UI-kit / токены)

Ошибки из практики пунктов 4–5. Сверяй перед приёмкой новых компонентов.

### Токены и темы


| Ошибка                                                     | Почему плохо                                                                   | Как правильно                                                    |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `--primary-foreground` только в `html.dark`, нет в `:root` | В light `text-primary-foreground` может не работать                            | Задавать парные токены и в light, и в dark                       |
| Primary-кнопка: `text-foreground`                          | В dark `foreground` светлый → лайм + белый текст, плохой контраст              | `text-primary-foreground` (обычно `#000` на лайме в обеих темах) |
| Путать `foreground` и `*-foreground`                       | `foreground` = текст **страницы**; `primary-foreground` = текст **на** primary | Семантика: цвет поверхности + цвет контента на ней               |
| Badge с `bg-primary` как у Button                          | В макете чип = soft lime (`Lime/150`), не CTA                                  | Badge primary → `bg-primary-soft`                                |




### Компоненты и API


| Ошибка                                                    | Почему плохо                                                | Как правильно                                                                   |
| --------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `{...props}` внутри `clsx(...)` / `className`             | `onClick`/`disabled` не попадают на DOM; className ломается | `className={clsx(...)}` отдельно, `{...props}` на элементе                      |
| Тип `ButtonHTMLAttributes`, рендер `<span>` / `<div>`     | Ложь в типах, лишние button-пропсы                          | Тип = элемент: `HTMLAttributes<HTMLSpanElement>` для Badge                      |
| `disabled:*` на неинтерактивном `span`                    | Стили не к чему привязать                                   | Либо не тянуть disabled, либо делать реальный `button`                          |
| Имя файла `budge` / компонент `Budge`                     | Путаница в импортах и ревью                                 | `badge.tsx` → `Badge`                                                           |
| Badge с `h-10` как у Button                               | Чип становится «кнопкой» по высоте                          | Высота по контенту: `px`/`py`, без фиксированного `h-*` (если макет не требует) |
| Зашивать ширину кнопки под один фрейм Figma (`w-[197px]`) | Ломается на другом тексте/языке                             | В UI-kit: высота + padding; ширину (`w-full` / `flex-1`) — с места вызова       |




### Shell / scroll


| Ошибка                                               | Почему плохо                                                        | Как правильно                                                           |
| ---------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `overflow-y-auto` на всём `aside` (nav + footer)     | Футер уезжает в скролл вместе с accordion                           | Скролл только на обёртке `CategoryNav`; `FooterLeft` — сосед `shrink-0` |
| `min-h-dvh` на shell без `h-dvh` / `overflow-hidden` | Колонка растёт с контентом (`min-height: auto`)                     | `h-dvh overflow-hidden` на корне layout                                 |
| `flex-1` без `min-h-0`                               | Flex-ребёнок не сжимается ниже контента, inner scroll не включается | Пара: `flex-1 min-h-0 overflow-y-auto`                                  |
| `flex-1` на `CategoryNav` внутри `<Suspense>`        | Flex-ребёнок aside = Suspense, не nav                               | Обёртка-div вокруг Suspense+nav                                         |
| `mt-auto` на футере при растущем aside               | Футер «прибивается» к низу **контента**, не viewport                | Сначала ограничить высоту aside, потом `shrink-0`                       |




### Carousel / горизонтальный scroll


| Ошибка                                             | Почему плохо                                               | Как правильно                                            |
| -------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| Нет `min-w-0` на page / section / wrap / `ul`      | Flex раздувается по карточкам, `scrollWidth ≈ clientWidth` | Цепочка `min-w-0` + `overflow-x-auto` только на scroller |
| Стрелки через `translateX` / «страницы» из массива | Ломает нативный свайп и a11y-скролл                        | `scrollBy` по ширине item + gap                          |
| `ResizeObserver` только на `ul`                    | Смена ширины item / загрузка картинок не обновляет края    | Observe `ul` и каждый `li`                               |
| Стрелки всегда visible                             | На экране без overflow шумят                               | Рендер overlay только при `canPrev                       |
| `pointer-events-none` забыли снять на кнопках      | Клики не доходят                                           | Слой `pointer-events-none`, кнопки `pointer-events-auto` |
| Моков ≤ числа видимых карточек                     | На desktop нет overflow — карусель «мёртвая»               | ≥ 8 рецептов в `home-mocks` для проверки                 |




### SectionHeader / Button-as-Link / иконки


| Ошибка                                                 | Почему плохо                           | Как правильно                                                        |
| ------------------------------------------------------ | -------------------------------------- | -------------------------------------------------------------------- |
| `action.href` в props, но рендер `<button>` без ссылки | CTA секции не навигирует               | `Button` с `href` → `Link`, или настоящий `asChild` + `<Link>`       |
| `asChild` + `href` в одном API без Slot                | Это не Radix-asChild; путаница в типах | Либо `href?: string` → Link, либо `asChild` + `@radix-ui/react-slot` |
| `import { Url } from "url"` для href                   | Node `Url`, не путь Next               | `href?: string`                                                      |
| `asChild: boolean` обязательный                        | Ломает все `<Button>` без пропа        | `asChild?: boolean` / не смешивать с href-режимом                    |
| Дублировать `className` у `button` и `Link`            | Расхождения стилей                     | Одна переменная `classes = clsx(...)`                                |
| `'text-foreground, font-medium'` (запятая в строке)    | Класс с запятой не существует          | `'text-foreground font-medium'`                                      |
| `leadming-8`, `xl:text:5xl`                            | Опечатки → стили не применяются        | `leading-8`, `xl:text-5xl`                                           |
| Скопировать `path` из другой иконки (bookmark → arrow) | Неверная графика                       | Брать `d` из своего SVG (`bs-arrow-right.svg`)                       |
| `fill="black"` в React-иконке                          | Не следует за темой/кнопкой            | `fill="currentColor"`                                                |
| SVG в Cursor открыт как превью                         | Не видно `path`                        | Open With… → Text Editor                                             |




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

- [https://nextjs.org/docs/app/getting-started/project-structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [https://nextjs.org/docs/app/getting-started/layouts-and-pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [https://nextjs.org/docs/app/api-reference/file-conventions/route-groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)
- [https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)



### Server / Client

- [https://nextjs.org/docs/app/getting-started/server-and-client-components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [https://nextjs.org/docs/app/api-reference/functions/use-pathname](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
- [https://dev.to/hongster85/hydration-in-reactnextjs-understand-in-3-minutes-3917](https://dev.to/hongster85/hydration-in-reactnextjs-understand-in-3-minutes-3917)



### Стили и шрифты

- [https://nextjs.org/docs/app/getting-started/css](https://nextjs.org/docs/app/getting-started/css)
- [https://nextjs.org/docs/app/api-reference/components/font](https://nextjs.org/docs/app/api-reference/components/font)
- [https://tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme)
- [https://tailwindcss.com/docs/responsive-design](https://tailwindcss.com/docs/responsive-design)



### UI-kit / компоненты (п.5)

- [https://nextjs.org/docs/app/api-reference/components/link](https://nextjs.org/docs/app/api-reference/components/link)
- [https://nextjs.org/docs/app/api-reference/components/image](https://nextjs.org/docs/app/api-reference/components/image)
- [https://nextjs.org/docs/app/getting-started/images-and-fonts](https://nextjs.org/docs/app/getting-started/images-and-fonts)



### Тема (light/dark)

- [https://github.com/pacocoursey/next-themes](https://github.com/pacocoursey/next-themes)



### Макет

- [https://www.figma.com/design/7m7WovEbnqKau1kpCbOkLP/?node-id=7-2](https://www.figma.com/design/7m7WovEbnqKau1kpCbOkLP/?node-id=7-2)

