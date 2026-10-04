export default async function RecipePage (props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;

    return (
        <main>
            Recipe id {id}
        </main>
    )
}