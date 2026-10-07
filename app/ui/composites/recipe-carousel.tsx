'use client'

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import clsx from 'clsx'
import { ArrowLeftIcon } from '@/app/ui/icons/arrow-left'
import { ArrowRightIcon } from '@/app/ui/icons/arrow-right'

const GAP_PX_MOBILE = 12
const GAP_PX_DESKTOP = 24

interface RecipeCarouselProps {
  children: ReactNode
  className?: string
  label?: string
}

export function RecipeCarousel({
  children,
  className,
  label = 'Карусель рецептов',
}: RecipeCarouselProps) {
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateScrollState = useEffectEvent(() => {
    const el = scrollerRef.current
    if (!el) return

    const maxScroll = el.scrollWidth - el.clientWidth
    const left = el.scrollLeft
    const epsilon = 2

    setCanPrev(left > epsilon)
    setCanNext(maxScroll > epsilon && left < maxScroll - epsilon)
  })

  useLayoutEffect(() => {
    updateScrollState()
  }, [children])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const onScroll = () => updateScrollState()
    el.addEventListener('scroll', onScroll, { passive: true })

    const resizeObserver = new ResizeObserver(() => updateScrollState())
    resizeObserver.observe(el)
    for (const child of el.children) {
      resizeObserver.observe(child)
    }

    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', onScroll)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateScrollState)
    }
  }, [children])

  const getStep = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return 0

    const firstItem = el.querySelector<HTMLElement>('[data-carousel-item]')
    if (!firstItem) return el.clientWidth

    const gap =
      window.matchMedia('(min-width: 90rem)').matches
        ? GAP_PX_DESKTOP
        : GAP_PX_MOBILE
    return firstItem.offsetWidth + gap
  }, [])

  const scrollByStep = useCallback(
    (direction: -1 | 1) => {
      const el = scrollerRef.current
      if (!el) return

      el.scrollBy({ left: direction * getStep(), behavior: 'smooth' })
    },
    [getStep],
  )

  const hasOverflow = canPrev || canNext

  return (
    <div className={clsx('relative w-full min-w-0', className)}>
      <ul
        ref={scrollerRef}
        aria-label={label}
        className={clsx(
          'flex w-full min-w-0 list-none gap-3 overflow-x-auto scroll-smooth lg:gap-6',
          'snap-x snap-mandatory',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        )}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            scrollByStep(-1)
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            scrollByStep(1)
          }
        }}
      >
        {children}
      </ul>

      {hasOverflow ? (
        <div className="pointer-events-none absolute inset-y-0 -inset-x-2 z-10 hidden items-center justify-between lg:flex">
          <button
            type="button"
            aria-label="Предыдущие рецепты"
            disabled={!canPrev}
            onClick={() => scrollByStep(-1)}
            className={clsx(
              'pointer-events-auto mb-18 flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] px-3',
              'bg-foreground text-header shadow-elevation-1 transition-opacity',
            )}
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            aria-label="Следующие рецепты"
            disabled={!canNext}
            onClick={() => scrollByStep(1)}
            className={clsx(
              'pointer-events-auto mb-18 flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] px-3',
              'bg-foreground text-header shadow-elevation-1 transition-opacity',
            )}
          >
            <ArrowRightIcon />
          </button>
        </div>
      ) : null}
    </div>
  )
}
