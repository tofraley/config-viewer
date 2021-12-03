import {promises as fs} from 'fs'
import { useState } from 'react'
import ConfigListItem from '../components/config-list-item'

const configDirectory = process.env.CONFIG_DIR

export async function getStaticProps(context) {
  const filenames = await (await fs.readdir(configDirectory)).filter((f) => f.endsWith('.json'))

  return {
    props: { filenames }
  }

}

export default function Home({filenames}) {
  const [filteredFiles, setFilteredFiles] = useState(filenames) 
  return (
    <div className="container mx-auto my-3">
          <div id="config-searchbar" className="">
            <input 
              className="border-solid border-4 border-blue-200 h-10 w-1/3" type="search"  
              onChange={
                (e) => setFilteredFiles(
                  filenames.filter((f) => f.toLowerCase().startsWith(e.target.value)))
              } />
          </div>
          {filteredFiles.map((filename) => (
            <ConfigListItem key={filename} filename={filename} />
          ))}
    </div>
  )
}