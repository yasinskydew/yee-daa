export type AllergenOption = {
  value: string
  label: string
}

export const ALLERGEN_OPTIONS = [
  { value: 'gluten', label: 'Глютен' },
  { value: 'lactose', label: 'Лактоза' },
  { value: 'nuts', label: 'Орехи' },
] as const satisfies readonly AllergenOption[]
