import fs from 'fs'
import { join } from 'path'
import { useState } from 'react'
import Inspector from "react-json-inspector"

const configDirectory = process.env.CONFIG_DIR

export async function getStaticProps() {
  const filteredFilenames = 
    fs.readdirSync(configDirectory)
      .filter((name) => name.endsWith('.json'));
  const files = filteredFilenames.map((filename) => {
    const fullPath = join(configDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    let content = "";
    try {
      content = JSON.parse(fileContents);
    } catch(ex) {
      console.log("There was a problem");
      console.log(ex);
      content = "Could not parse content"
    }

    return { 
      filename: filename, 
      content: content
    }
  });
  return { props: { files }}
}

export default function Home({files}) {
  const [selectedFile, setSelectedFile] = useState(0);
  return (
    <div className="grid gap-2 grid-cols-2">
      <ConfigSelector 
        files={files}
        setSelectedFile={setSelectedFile} />
      <ConfigDisplay { ...files[selectedFile]} />
    </div>
  )
}

function ConfigSelector({files, setSelectedFile}) {
  const [filteredFiles, setFilteredFiles] = useState(files);
  return (
    <div className="border-solid border-4 border-blue-300 rounded-lg">
      <input 
        placeholder="Search..."
        className="m-2 text-lg p-1 h-10 rounded border-2 border-blue-300 focus:outline-none" type="search"  
        onChange={(e) => setFilteredFiles(
            files.filter((f) => f.filename.toLowerCase().startsWith(e.target.value.toLowerCase()))
      )}
        />
      <div className="pl-2 mt-1 min-h-full">
        {filteredFiles.map((file, i) => (
          <h2
            className="m-1 rounded text-lg cursor-pointer hover:bg-blue-200"
            key={i} 
            onClick={(e) => setSelectedFile(i)}
            >
              {file.filename.replace('.json', '')}
          </h2>
        ))}
      </div>
    </div>
  )
}

function ConfigDisplay(file) {
  return (
    <div className="border-4 border-solid border-green-300 rounded">
      <Inspector className="text-lg font-sans" data={file.content} />
    </div>
  )
}