const ListItem = ({display, isSelected, clickHandler}) => {
  return (
    <h2
      className={`${isSelected ? 'bg-blue-100' : ''} pl-1 rounded text-lg cursor-pointer hover:bg-blue-200`}
      onClick={clickHandler}
      >
        {display}
    </h2>
  );
}

export default ListItem;