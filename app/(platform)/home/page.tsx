import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1 className="">Главная</h1>
      <ul>
        <li>
          <Link href="/recipes/1">Рецепт #1</Link>
        </li>
        <li>
          <Link href="/category/vegan">Веганская кухня</Link>
        </li>
        <li>
          <Link href="/blogs/1">Блог #1</Link>
        </li>
      </ul>
    </>
  );
}
