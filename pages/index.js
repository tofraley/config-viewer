import fs from 'fs'
import { join } from 'path'
import { useState } from 'react'
import Inspector from "react-json-inspector"

const configDirectory = process.env.CONFIG_DIR

export async function getStaticProps() {
  const filteredFilenames = 
    fs.readdirSync(configDirectory)
      .filter((name) => name.endsWith('.json'));
//console.log(filteredFilenames);
  const files = filteredFilenames.map((filename) => {
    const fullPath = join(configDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    let content = "";
    try {
      content = JSON.parse(fileContents);
    } catch(ex) {
      console.log("There was a problem");
      console.log(ex);
    }

    return { 
      filename: filename, 
      content: content
    }
  });
  return { props: { files }}
}

export default function Home({files}) {
  const [filteredFiles, setFilteredFiles] = useState(files);
  const [selectedFile, setSelectedFile] = useState(files[0]);
  return (
    <div className="container ml-8 my-3">
      <div className="grid gap-2 grid-cols-2">
        <div className="">
          <input 
            placeholder="Search..."
            className="text-lg border-solid border-4 border-blue-300 rounded-lg p-3 h-10 w-full" type="search"  
            onChange={
              (e) => setFilteredFiles(
                files.filter((f) => f.filename.toLowerCase().startsWith(e.target.value.toLowerCase())))
            }
            />
          <div className="border-solid border-4 border-blue-300 rounded-lg mt-2 min-h-full">
            {filteredFiles.map((file, i) => (
              <h2
                className="pl-3 p-1 m-1 rounded text-lg cursor-pointer hover:bg-blue-200"
                key={i} 
                onClick={(e) => setSelectedFile(
                  file
                )}
                >
                  {file.filename.replace('.json', '')}
              </h2>
            ))}
          </div>
        </div>
        <div>
        <div className="text-center">
          <h1 className="text-xl mt-1">Config Viewer</h1>
        </div>
        <div className="min-w-max min-h-full max-w-full p-4 mt-4 border-solid border-4 border-green-300 rounded-lg">
          <Inspector data={selectedFile.content} />
        </div>
        </div>
      </div>
    </div>
  )
}