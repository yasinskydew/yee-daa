import SectionHeader from "@/app/ui/section-header";

export default function HomePage() {
  return (
    <>
      <h1 className="">Главная</h1>
      <section>
        <SectionHeader title="Новые рецепты" />
      </section>
      <section>
        <SectionHeader
          title="Самое сочное"
          action={{ label: "Вся подборка", href: "/subscriptions" }}
        />
      </section>
      <section>
        <SectionHeader
          title="Кулинарные блоги"
          action={{ label: "Все авторы", href: "/subscriptions" }}
        />
      </section>
    </>
  );
}
