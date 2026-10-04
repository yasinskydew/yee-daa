export default async function BlogPage (props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;

    return (
        <main>
            Blog id {id}
        </main>
    )
}