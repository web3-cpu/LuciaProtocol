import Link from 'next/link'

export default function Success() {
  return (
    <>
      <h1>Success page</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}