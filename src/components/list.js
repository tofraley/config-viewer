import ListItem from './list-item'

const List = ({data, selectedItem, setSelectedItem}) => {
  return (
      <div className="ml-2 mr-2 min-h-full">
        {data.map((file, i) => (
          <ListItem key={i} display={file} 
            isSelected={(selectedItem == file)}
            clickHandler={(e) => (
              setSelectedItem(file)
            )}/>
        ))}
      </div>
  );
}

export default List;