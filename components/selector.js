import List from "./list";
import Search from "./search";
import { useState } from "react";

export default function Selector({groups, selectedItem, setSelectedItem}) {
  const [filteredGroups, setFilteredGroups] = useState(groups);
  const filter = 
    (terms) => (
      setFilteredGroups(
        groups.map((data, i) => data.filter((d) => d.toLowerCase().startsWith(terms.toLowerCase())))
      )
    );
  console.log(groups)

  return (
    <>
      <Search changeHandler={(e) => filter(e.target.value)} />
        {filteredGroups.map((group) => (
          <div key={group.name}>
            <h3>{group.name}</h3>
            <List data={group.data} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
          </div>
        ))}
    </>
  );
}
