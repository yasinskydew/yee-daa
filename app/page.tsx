import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>Yee Daa</p>
      <Link href={'/home'}>Home</Link>
    </div>
  )
}