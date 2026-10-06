export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sub?: string }>
}) {
  const { cat, sub } = await searchParams

  return (
    <>
      <h1>Приятного аппетита!</h1>
      {(cat || sub) && (
        <p className="text-muted">
          {cat}
          {sub ? ` / ${sub}` : ''}
        </p>
      )}
    </>
  )
}
