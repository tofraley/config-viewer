import ListItem from './list-item'

const List = ({data, selectedItem, setSelectedItem}) => {
  return (
      <div className="ml-2 mr-2 min-h-full">
        {data.map((file, i) => (
          <ListItem key={i} display={file} 
            isSelected={(selectedItem == i)}
            clickHandler={(e) => (
              setSelectedItem(i)
            )}/>
        ))}
      </div>
  );
}

export default List;