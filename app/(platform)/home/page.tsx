import Search from '@/app/ui/primitives/search'

type HomePageProps = {
  searchParams: Promise<{ cat?: string; sub?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  await searchParams
  const title = 'Приятного аппетита!'

  return (
    <div className="mx-auto flex w-full max-w-[898px] flex-col items-center gap-8 pt-8">
      <h1 className="w-full text-center text-[32px] leading-8 font-bold text-foreground md:whitespace-nowrap md:text-[40px] xl:text-5xl xl:leading-12">
        {title}
      </h1>
      <Search placeholder="Название или ингредиент..." />
    </div>
  )
}
