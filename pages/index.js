import fs from 'fs'
import { join } from 'path'
import { useState } from 'react'
import Inspector from "react-json-inspector"
import Box from "../components/box"
import Selector from "../components/selector"
import useGroups from '../services/groups'

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
  const filenames = files.map((f) => f.filename.replace('.json', ''));
  const [groups, setGroups] = useGroups(filenames)

  return (
    <div className="grid gap-2 grid-cols-2">
      <Box borderColor='blue'>
        <Selector groups={groups} selectedItem={selectedFile} setSelectedItem={setSelectedFile} />
      </Box>
      <Box borderColor='green'>
        <Inspector className="text-lg font-sans" data={files[selectedFile].content} filterOptions={{ignoreCase: true}} />
      </Box>
    </div>
  );
}