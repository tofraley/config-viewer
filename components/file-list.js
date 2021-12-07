import FileItem from './file-list-item'

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

export default FileList;