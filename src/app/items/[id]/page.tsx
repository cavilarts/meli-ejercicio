export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const id = (await params).id
  return <div>Item: {id}</div>
}
