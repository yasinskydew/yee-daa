"use client";

import { useState } from "react";
import clsx from "clsx";
import Button from "@/app/ui/primitives/button";
import { SearchIcon } from "@/app/ui/icons/search-icon";
import { MagnifyingGlassIcon } from "@/app/ui/icons/magnifying-glass";
import { ArrowDownSLineIcon } from "@/app/ui/icons/arrow-down-s-line";

type SearchProps = {
  placeholder?: string;
  className?: string;
};

export default function Search({
  placeholder = "Название или ингредиент...",
  className,
}: SearchProps) {
  const [excludeAllergens, setExcludeAllergens] = useState(false);
  const ALLERGEN_OPTIONS = [
    { value: "gluten", label: "Глютен" },
    { value: "lactose", label: "Лактоза" },
    { value: "nuts", label: "Орехи" },
  ] as const;
  return (
    <form
      role="search"
      className={clsx(
        "flex w-full flex-col items-center gap-4 pb-8",
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
          className="size-12 shrink-0 rounded-[var(--radius-md)] border-foreground/48 px-3"
        >
          <SearchIcon />
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
              "h-12 w-full rounded-[var(--radius-md)] border border-foreground/48 bg-background",
              "pl-4 pr-12 text-lg font-normal text-placeholder outline-none",
              "placeholder:text-placeholder",
              "[&::-webkit-search-cancel-button]:hidden",
            )}
          />
          <button
            type="submit"
            aria-label="Найти"
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-foreground"
          >
            <MagnifyingGlassIcon />
          </button>
        </div>
      </div>

      <div className="flex w-full max-w-[518px] flex-wrap items-center gap-4">
        <label className="flex shrink-0 cursor-pointer items-center gap-3 py-1.5 pl-2 text-base font-medium whitespace-nowrap text-foreground">
          Исключить мои аллергены
          <input
            type="checkbox"
            className="peer sr-only"
            checked={excludeAllergens}
            onChange={(event) => setExcludeAllergens(event.target.checked)}
          />
          <span
            aria-hidden
            className={clsx(
              "relative h-5 w-[34px] shrink-0 rounded-full transition-colors",
              excludeAllergens ? "bg-primary" : "bg-foreground/16",
            )}
          >
            <span
              className={clsx(
                "absolute top-0.5 left-0.5 size-4 rounded-full bg-background transition-transform",
                excludeAllergens && "translate-x-[14px]",
              )}
            />
          </span>
        </label>

        <div className="relative min-w-[200px] flex-1">
          <select
            defaultValue=""
            aria-label="Выберите из списка"
            className={clsx(
              "h-10 w-full appearance-none rounded-[var(--radius-md)] border border-foreground/8 bg-background",
              "py-2 pr-[43px] pl-[15px] text-base font-normal text-foreground/64",
            )}
          >
            <option value="" disabled>
              Выберите из списка...
            </option>
            {ALLERGEN_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-[11px] flex size-5 -translate-y-1/2 items-center justify-center overflow-hidden text-foreground">
            <ArrowDownSLineIcon />
          </span>
        </div>
      </div>
    </form>
  );
}
