import List from "./list";
import GroupList from "./group-list";
import Search from "./search";
import { useState } from "react";
import Feature from '../components/feature'
import UnlessFeature from "./unless-feature";

export default function Selector({data, selectedItem, setSelectedItem}) {
  const [filteredData, setFilteredData] = useState(data)

  const filter = 
    (terms) => (
      setFilteredData(
        data.filter((d) => d.toLowerCase().startsWith(terms.toLowerCase()))
      )
    );

  return (
    <>
      <Search changeHandler={(e) => filter(e.target.value)} />
      <Feature name='group'>
        <GroupList data={filteredData} {...{selectedItem, setSelectedItem}}/>
      </Feature>
      <UnlessFeature name='group'>
        <List data={filteredData} {...{setSelectedItem, selectedItem}} />
      </UnlessFeature>
    </>
  );
}