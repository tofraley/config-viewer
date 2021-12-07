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
      console.log("Could not parse content");
      content = "Could not parse content"
    }

    return { 
      filename: filename, 
      content: content
    }
  });

  return { props: { files }};
}

export default function Home({files}) {

  const [selectedFile, setSelectedFile] = useState(0);

  return (
    <div className="grid gap-2 grid-cols-2">
      <LeftBox>
        <ConfigSelector files={files} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      </LeftBox>
      <RightBox>
        <Inspector className="text-lg font-sans" data={files[selectedFile].content} />
      </RightBox>
    </div>
  );
}

const SelectorSearch = ({files, changeHandler}) => {
  return (
    <input 
      placeholder="Search..."
      className="mt-2 ml-2 text-lg pl-1 h-10 rounded border-2 border-blue-300 focus:outline-none w-1/2" type="search"  
      onChange={changeHandler} />
  );
}

const FileItem = ({file, isSelected, clickHandler}) => {
  return (
    <h2
      className={`${isSelected ? 'bg-blue-100' : ''} pl-1 rounded text-lg cursor-pointer hover:bg-blue-200`}
      onClick={clickHandler}
      >
        {file.filename.replace('.json', '')}
    </h2>
  );
}

const LeftBox = ({children}) => {
  return (
    <div className="border-solid border-4 border-blue-300 rounded-lg">
      { children }
    </div>
  );
}

const FileList = ({files, selectedFile, setSelectedFile}) => {
  return (
      <div className="ml-2 mr-2 min-h-full">
        {files.map((file, i) => (
          <FileItem key={i} file={file} 
            isSelected={(selectedFile == i)}
            clickHandler={(e) => {
              setSelectedFile(i)
            }}/>
        ))}
      </div>
  );
}

function ConfigSelector({files, selectedFile, setSelectedFile}) {
  const [filteredFiles, setFilteredFiles] = useState(files);
  const filter = (terms) => 
            setFilteredFiles(
              files.filter((f) => f.filename.toLowerCase().startsWith(terms.toLowerCase()))
            );
  return (
    <>
      <SelectorSearch files={files} changeHandler={(e) => filter(e.target.value)} />
      <FileList files={filteredFiles} setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
    </>
  );

}

function RightBox({children}) {
  return (
    <div className="border-4 border-solid border-green-300 rounded">
      { children }
    </div>
  );
}