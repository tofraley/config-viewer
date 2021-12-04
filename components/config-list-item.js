import Link from 'next/link'

export default function ConfigListItem({filename}) {
  return (
    <div className="border-2 my-2 p-2 rounded">
      <Link href={`/${encodeURIComponent(filename)}`}>
        <a>
          <p>{filename.replace('.json', '')}</p>
        </a>
      </Link>
    </div>
  )
}