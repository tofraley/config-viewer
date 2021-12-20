import Group from './group'
import useGroups from '../services/groupService'
import { useState } from 'react'

const GroupList = ({data, selectedItem, setSelectedItem}) => {
  const [groups, setGroups] = useGroups(data)
  const [filteredGroups, setFilteredGroups] = useState(groups);
  return (
      <div className="ml-2 mr-2 min-h-full">
        {filteredGroups.map(({id, name, data, isOpen}, i) => (
          <Group key={name} {...{id, name, data, isOpen, selectedItem, setSelectedItem}} />
        ))}
      </div>
  );
}

export default GroupList;