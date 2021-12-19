import fs from 'fs'
import { join } from 'path'
import { useState } from 'react'
import Inspector from "react-json-inspector"
import Box from "../components/box"
import SelectorV2 from "../components/selector-v2"
import Selector from "../components/selector"
import useGroups from '../services/groupService'
import FeatureReplace from '../components/feature-replace'


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

function HomeV1({files}) {
  const [selectedFile, setSelectedFile] = useState(0);
  const filenames = files.map((f) => f.filename.replace('.json', ''));

  return (
    <div className="grid gap-2 grid-cols-2">
      <Box borderColor='blue'>
        <Selector data={filenames} selectedItem={selectedFile} setSelectedItem={setSelectedFile} />
      </Box>
      <Box borderColor='green'>
        <Inspector className="text-lg font-sans" data={files[selectedFile].content} filterOptions={{ignoreCase: true}} />
      </Box>
    </div>
  );
}

function HomeV2({files}) {
  const [selectedFile, setSelectedFile] = useState(0);
  const filenames = files.map((f) => f.filename.replace('.json', ''));
  const [groups, setGroups] = useGroups(filenames)

  return (
    <div className="grid gap-2 grid-cols-2">
      <Box borderColor='blue'>
        <SelectorV2 groups={groups} selectedItem={selectedFile} setSelectedItem={setSelectedFile} />
      </Box>
      <Box borderColor='green'>
        <Inspector className="text-lg font-sans" data={files[selectedFile].content} filterOptions={{ignoreCase: true}} />
      </Box>
    </div>
  );
}

// Hiding new feature behind flag
// not sure if this is the best way to feature flag
export default function Home({features, files}) {
  return (
    <FeatureReplace 
      features={features} 
      featureName={'group'} 
      featureComponent={<HomeV2 files={files} />} 
      defaultComponent={<HomeV1 files={files}/>} 
      />
  )
}