import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Inspector from "react-json-inspector"
import {promises as fs} from 'fs'

const configDirectory = process.env.CONFIG_DIR

export async function getStaticPaths() {
  const filenames = await fs.readdir(configDirectory)
  const filePaths = filenames.map((f) => { return { params: { id: `${f}` }}})
  console.log(filePaths[0]) 
  return {
    paths: filePaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  console.log(context)
  const file = await fs.readFile(configDirectory + '/' + context.params.id,)
  const data = JSON.parse(file);

  return {
    props: { data }
  }
}

export default function Config({data}) {
  return (
    <div className={styles.container}>
      <Inspector data={data} />
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  )
}