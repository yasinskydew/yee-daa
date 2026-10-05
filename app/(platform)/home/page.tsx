import AuthorCard from "@/app/ui/composites/author-card";
import SectionHeader from "@/app/ui/composites/section-header";

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
        <div>
          <AuthorCard 
            name="Елена Высоцкая"
            handle="@elenapovar"
            description="Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку."
            href="#"
            imageSrc="/avatar-mock.jpg"
            imageAlt="elenapovar"
          />
        </div>
      </section>
    </>
  );
}
