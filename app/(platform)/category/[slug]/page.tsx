export default async function CategoryPage (props: { params: Promise<{ slug: string }>}) {
    const params = await props.params;
    const slug = params.slug;

    return (
        <main>
            Category slug {slug}
        </main>
    )
}