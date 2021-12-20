import fs from 'fs'
import { join } from 'path'
import { useState } from 'react'
import Inspector from "react-json-inspector"
import Box from "../components/box"
import Selector from "../components/selector"
import FeatureContext from '../components/feature-context'


export async function getStaticProps() {
  const configDirectory = process.env.CONFIG_DIR
  const features = process.env.FEATURES?.split(',')

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

  return { props: { features, files }};
}

export default function Home({features, files}) {
  const [selectedFile, setSelectedFile] = useState(0);
  const filenames = files.map((f) => f.filename.replace('.json', ''));

  return (
    <FeatureContext.Provider value={features}>
      <div className="grid gap-2 grid-cols-2">
        <Box borderColor='blue'>
          <Selector data={filenames} selectedItem={selectedFile} setSelectedItem={setSelectedFile} />
        </Box>
        <Box borderColor='green'>
          <Inspector className="text-lg font-sans" data={files[selectedFile].content} filterOptions={{ignoreCase: true}} />
        </Box>
      </div>
    </FeatureContext.Provider>
  );
}