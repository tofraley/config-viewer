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

export default FileItem;