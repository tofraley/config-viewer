import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
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
    <div className={styles.container}>
        {filenames.map((filename) => (
            <Link key={filename} href={`/${encodeURIComponent(filename)}`}>
              <a>
                <div>{filename}</div>
              </a>
            </Link>
        ))}
    </div>
  )
}