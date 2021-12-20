import List from "./list";
import Search from "./search";
import { useState } from "react";
import Feature from '../components/feature'
import UnlessFeature from "./unless-feature";
import useGroups from '../services/groupService'
import ListItem from './list-item'
import Group from './group'

export default function Selector({data, selectedItem, setSelectedItem}) {
  const [groups, setGroups] = useGroups(data)
  const [filteredData, setFilteredData] = useState(data)
  const [filteredGroups, setFilteredGroups] = useState(groups)

  const filter = 
    (terms) => (
      setFilteredData(
        data.filter((d) => d.toLowerCase().startsWith(terms.toLowerCase()))
      )
    );

  const filterGroups = 
    (terms) => (
      setFilteredGroups(
        groups.map(g => (
          { 
            ...g,
            data: g.data?.filter((item) => item.toLowerCase().startsWith(terms.toLowerCase())),
          }
        ))
      )
    );

  return (
    <>
      <Feature name='group'>
        <Search changeHandler={(e) => filterGroups(e.target.value)} />
        <List>
          {filteredGroups.map(({id, name, data, isOpen}) => (
            <Group key={name} {...{id, name, isOpen, data, selectedItem, setSelectedItem}} />
          ))}
        </List>
      </Feature>
      <UnlessFeature name='group'>
        <Search changeHandler={(e) => filter(e.target.value)} />
        <List>
          {filteredData.map((file) => (
            <ListItem key={file} display={file} 
              isSelected={(selectedItem == file)}
              clickHandler={(_) => (
                setSelectedItem(file)
              )}/>
          ))}
        </List>
      </UnlessFeature>
    </>
  );
}