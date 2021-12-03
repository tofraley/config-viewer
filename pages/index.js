import Link from 'next/link'
import {promises as fs} from 'fs'

const configDirectory = process.env.CONFIG_DIR

export async function getStaticProps(context) {
  const filenames = await (await fs.readdir(configDirectory)).filter((f) => f.endsWith('.json'))

  return {
    props: { filenames }
  }

}

export default function Home({filenames}) {
  console.log(filenames);
  return (
    <div >
        {filenames.map((filename) => (
          <div key={filename} >
            <div >
            <Link href={`/${encodeURIComponent(filename)}`}>
              <a>
                <p>{filename.replace('.json', '')}</p>
              </a>
            </Link>
          </div>
          </div>
        ))}
    </div>
  )
}