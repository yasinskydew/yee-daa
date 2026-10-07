'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { ALLERGEN_OPTIONS } from '@/app/data/allergens'
import { Button } from '@/app/ui/primitives/button'
import { Select } from '@/app/ui/primitives/select'
import { Switch } from '@/app/ui/primitives/switch'
import { SearchIcon } from '@/app/ui/icons/search-icon'
import { MagnifyingGlassIcon } from '@/app/ui/icons/magnifying-glass'

interface SearchProps {
  placeholder?: string
  className?: string
}

export function Search({
  placeholder = 'Название или ингредиент...',
  className,
}: SearchProps) {
  const [excludeAllergens, setExcludeAllergens] = useState(false)

  return (
    <form
      role="search"
      className={clsx(
        'flex w-full flex-col items-center gap-2 pb-0 lg:gap-4 lg:pb-8',
        className,
      )}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex w-full max-w-[518px] items-center justify-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="none"
          aria-label="Фильтры"
          className="size-8 shrink-0 rounded-[var(--radius-md)] border-foreground/48 px-2 lg:size-12 lg:px-3"
        >
          <SearchIcon className="size-3.5 lg:size-6" />
        </Button>

        <div className="relative min-w-0 flex-1">
          <label htmlFor="home-search" className="sr-only">
            Поиск рецептов
          </label>
          <input
            id="home-search"
            name="q"
            type="search"
            placeholder={placeholder}
            className={clsx(
              'w-full rounded-[var(--radius-md)] border border-foreground/48 bg-background',
              'h-8 pl-3 pr-8 text-sm font-normal text-placeholder outline-none',
              'placeholder:text-placeholder',
              'lg:h-12 lg:pl-4 lg:pr-12 lg:text-lg',
              '[&::-webkit-search-cancel-button]:hidden',
            )}
          />
          <button
            type="submit"
            aria-label="Найти"
            className="absolute inset-y-0 right-0 flex w-8 items-center justify-center text-foreground lg:w-12"
          >
            <MagnifyingGlassIcon className="size-3.5 lg:size-6" />
          </button>
        </div>
      </div>

      <div className="hidden w-full max-w-[518px] flex-wrap items-center gap-4 lg:flex">
        <Switch
          label="Исключить мои аллергены"
          checked={excludeAllergens}
          onChange={setExcludeAllergens}
        />
        <Select options={ALLERGEN_OPTIONS} />
      </div>
    </form>
  )
}
