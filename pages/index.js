import fs from 'fs'
import { join } from 'path'
import { useState } from 'react'
import Inspector from "react-json-inspector"
import LeftBox from "../components/left-box"
import RightBox from "../components/right-box"
import ConfigSelector from "../components/config-selector"

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