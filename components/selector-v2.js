import List from "./list";
import Search from "./search";
import { useState } from "react";
import Group from "./group";

export default function SelectorV2({groups, selectedItem, setSelectedItem}) {
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const filter = 
    (terms) => (
      setFilteredGroups(
        groups.map((data, i) => data.filter((d) => d.toLowerCase().startsWith(terms.toLowerCase())))
      )
    );

  return (
    <>
      <Search changeHandler={(e) => filter(e.target.value)} />
        {filteredGroups.map(({id, name, data, isOpen}, i) => (
          <Group key={name} {...{id, name, data, isOpen, selectedItem, setSelectedItem}} />
        ))}
    </>
  );
}
