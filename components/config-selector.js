import FileList from "./file-list";
import SelectorSearch from "./selector-search";
import { useState } from "react";

export default function ConfigSelector({files, selectedFile, setSelectedFile}) {
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
