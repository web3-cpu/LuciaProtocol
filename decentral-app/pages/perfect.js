import Link from 'next/link'

export default function Perfect() {
  return (
    <>
      <h1>Perfect page</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}