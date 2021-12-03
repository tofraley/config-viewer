import Link from 'next/link'

export default function ConfigListItem({filename}) {
  return (
    <div>
      <div>
        <Link href={`/${encodeURIComponent(filename)}`}>
          <a>
            <p>{filename.replace('.json', '')}</p>
          </a>
        </Link>
      </div>
    </div>
  )
}