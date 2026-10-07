import Search from '@/app/ui/primitives/search'
import NewRecipesSection from '@/app/ui/composites/new-recipes-section'
import JuiciestRecipesSection from '@/app/ui/composites/juiciest-recipes-section'
import CulinaryBlogsSection from '@/app/ui/composites/culinary-blogs-section'
import VeganKitchenSection from '@/app/ui/composites/vegan-kitchen-section'

type HomePageProps = {
  searchParams: Promise<{ cat?: string; sub?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  await searchParams
  const title = 'Приятного аппетита!'

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-[1360px] flex-col items-stretch gap-8 pt-8">
      <div className="mx-auto flex w-full max-w-[898px] flex-col items-center gap-8">
        <h1 className="w-full text-center text-[32px] leading-8 font-bold text-foreground md:whitespace-nowrap md:text-[40px] xl:text-5xl xl:leading-12">
          {title}
        </h1>
        <Search placeholder="Название или ингредиент..." />
      </div>

      <NewRecipesSection />
      <JuiciestRecipesSection />
      <CulinaryBlogsSection />
      <VeganKitchenSection />
    </div>
  )
}
