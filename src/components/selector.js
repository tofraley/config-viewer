import List from "./list";
import Search from "./search";
import { useState, useContext } from "react";
import Feature from '../components/feature'
import UnlessFeature from "./unless-feature";
import useGroups from '../services/groupService'
import ListItem from './list-item'
import Group from './group'
import FeatureContext from '../components/feature-context'

export default function Selector({data, selectedItem, setSelectedItem}) {
  const [groups, setGroups] = useGroups(data)
  const [filteredData, setFilteredData] = useState(data)
  const [filteredGroups, setFilteredGroups] = useState(groups)
  const features = useContext(FeatureContext)
  const isGroupFeatureOn = features.find(f => f === 'group')

  const filterData = 
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

  function filter(terms) {
    if(isGroupFeatureOn) { 
      return filterGroups(terms)
    }
    return filterData(terms)
  }

  return (
    <>
        <Search changeHandler={(e) => filter(e.target.value)} />
        <List>
          <Feature name='group'>
            {filteredGroups.map(({id, name, data, isOpen}) => (
              <Group key={name} {...{id, name, isOpen, data, selectedItem, setSelectedItem}} />
            ))}
          </Feature>
          <UnlessFeature name='group'>
              {filteredData.map((file) => (
                <ListItem key={file} display={file} 
                  isSelected={(selectedItem == file)}
                  clickHandler={(_) => (
                    setSelectedItem(file)
                  )}/>
              ))}
          </UnlessFeature>
        </List>
    </>
  );
}